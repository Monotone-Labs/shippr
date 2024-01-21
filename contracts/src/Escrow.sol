// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {CCIPReceiver} from "@chainlink-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink-ccip/src/v0.8/interfaces/IRouterClient.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {IPool} from "./interfaces/IPool.sol";

contract Escrow is FunctionsClient, ConfirmedOwner, ERC721 {
    using SafeERC20 for IERC20;
    using FunctionsRequest for FunctionsRequest.Request;

    struct Agreement {
        address token;
        address user;
        address merchant;
        string product;
        uint256 amount;
        string trackingCode;
        bool delivered;
        uint256 timestamp;
        uint64 paymentDestinationChain;
    }

    uint64 public immutable localChain;
    IRouterClient public immutable ccipRouter;
    IERC20 public immutable gho;
    IPool public immutable aavePool;
    mapping(bytes32 id => Agreement agreement) public agreements;
    mapping(bytes32 request => bytes32 id) public requests;

    event AgreementCreated(
        bytes32 indexed id, address indexed user, address indexed merchant, string product, uint256 amount
    );
    event AgreementCancelled(bytes32 indexed id);
    event AgreementUpdated(bytes32 indexed id);
    event AgreementFulfilled(bytes32 indexed id);
    event MessageSent(
        bytes32 indexed messageId,
        uint64 indexed destinationChainSelector,
        address receiver,
        string message,
        Client.EVMTokenAmount tokenAmount,
        uint256 fees
    );

    error Exception(string reason);

    constructor(uint64 _localChain, address _ccipRouter, address _cfRouter, address _aavePool, address _gho)
        FunctionsClient(_cfRouter)
        ConfirmedOwner(msg.sender)
        ERC721("Escrow Position", "ESCROW")
    {
        localChain = _localChain;
        ccipRouter = IRouterClient(_ccipRouter);
        aavePool = IPool(_aavePool);
        gho = IERC20(_gho);
    }

    modifier exists(bytes32 id) {
        if (agreements[id].user == address(0)) revert Exception("Invalid ID");
        _;
    }

    function _isMerchant(Agreement memory agreement) internal view {
        if (msg.sender != agreement.merchant) revert Exception("Not the merchant");
    }

    function _hasExpired(Agreement memory agreement) internal view {
        if (agreement.delivered || agreement.timestamp + 30 days > block.timestamp) revert Exception("Not fulfillable");
    }

    function createAgreement(
        address token,
        address merchant,
        uint64 paymentDestinationChain,
        string memory product,
        uint256 amount
    ) external returns (bytes32) {
        bytes32 id = keccak256(abi.encodePacked(msg.sender, merchant, product, amount));
        if (agreements[id].user != address(0)) revert Exception("Already exists");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        aavePool.supply(token, amount, address(this), 0);
        agreements[id] = Agreement({
            token: token,
            user: msg.sender,
            merchant: merchant,
            product: product,
            amount: amount,
            trackingCode: "",
            timestamp: block.timestamp,
            delivered: false,
            paymentDestinationChain: paymentDestinationChain
        });
        _safeMint(merchant, uint256(id));

        emit AgreementCreated(id, msg.sender, merchant, product, amount);

        return id;
    }

    function cancelAgreement(bytes32 id) external exists(id) {
        Agreement storage agreement = agreements[id];
        if (agreement.delivered || agreement.timestamp + 30 days > block.timestamp) revert Exception("Not cancellable");
        delete agreements[id];
        _burn(uint256(id));

        aavePool.withdraw(agreement.token, agreement.amount, agreement.user);
        gho.safeTransfer(agreement.user, agreement.amount);

        emit AgreementCancelled(id);
    }

    function updateAgreement(bytes32 id, string memory trackingCode) external exists(id) {
        Agreement storage agreement = agreements[id];
        _isMerchant(agreement);
        _hasExpired(agreement);

        agreement.trackingCode = trackingCode;

        emit AgreementUpdated(id);
    }

    function requestPayment(bytes memory request, uint64 subscriptionId, uint32 gasLimit, bytes32 donID)
        external
        payable
        returns (bytes32 requestId)
    {
        if (msg.value < 1e15 wei) revert Exception("Payment transactional cost too low");

        requestId = _sendRequest(request, subscriptionId, gasLimit, donID);
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory /*err*/ ) internal override {
        (bool success) = abi.decode(response, (bool));

        if (success) _fulfillAgreement(requests[requestId]);
    }

    function transfer(address from, address to, uint256 tokenId) external {
        Agreement storage agreement = agreements[bytes32(tokenId)];
        if (agreement.merchant != from) revert Exception("Only owner");
        _transfer(from, to, tokenId);
        agreement.merchant = to;
    }

    function _fulfillAgreement(bytes32 id) internal exists(id) {
        Agreement storage agreement = agreements[id];
        _isMerchant(agreement);
        _hasExpired(agreement);

        delete agreements[id];
        _burn(uint256(id));

        aavePool.borrow(address(gho), agreement.amount, 1, 0, address(this));
        _crosschainPayment(agreement.paymentDestinationChain, agreement.merchant, "", agreement.amount);

        emit AgreementFulfilled(id);
    }

    function _crosschainPayment(
        uint64 destinationChainSelector,
        address receiver,
        string memory message,
        uint256 amount
    ) internal {
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({token: address(gho), amount: amount});
        tokenAmounts[0] = tokenAmount;

        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(message),
            tokenAmounts: tokenAmounts,
            extraArgs: "",
            feeToken: address(0) // use ETH
        });

        gho.approve(address(ccipRouter), amount);
        uint256 fees = ccipRouter.getFee(destinationChainSelector, evm2AnyMessage);
        if (address(this).balance < fees) revert Exception("Insufficient ETH provided");

        bytes32 messageId = ccipRouter.ccipSend{value: fees}(destinationChainSelector, evm2AnyMessage);

        emit MessageSent(messageId, destinationChainSelector, receiver, message, tokenAmount, fees);
    }
}
