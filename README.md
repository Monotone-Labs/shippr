# Shippr

## Abstract

This project is aimed at facilitating secure and automated transactions between users and merchants. It uses a smart contract to ensure that funds are securely held and only released upon product delivery. The contract serves as an intermediary, holding funds in escrow until the transaction is completed or to refund the user if the package is lost or never shipped.

## How Chainlink, Aave, and GHO are used

- **Chainlink**: The contract incorporates Chainlink, particularly its Cross-Chain Interoperability Protocol (CCIP) and Functions features. Chainlink's **CCIP** is used for cross-chain paying the merchant in GHO. The **Functions** feature is used to ping the tracking API and check if the package has been delivered to the user.

- **Aave/GHO**: Aave is integrated via GHO. Users pay in any token, the smart contract borrows GHO and pays the merchants in GHO upon successful delivery of the goods. Otherwise, it refunds the user.

## Technical Description

- The contract is built on Solidity version 0.8.20 and integrates various OpenZeppelin contracts for standard functionalities like ERC721 (NFT) and ERC20 (token) interactions.

- It defines an `Agreement` struct to store details of each transaction, including the involved parties, product details, amount, and tracking information.

- Key functions include `createAgreement`, `cancelAgreement`, `updateAgreement`, and `_fulfillAgreement`, each handling different stages of an escrow transaction.

- The contract uses Chainlink's CCIPReceiver and Client libraries for cross-chain communication and to process external data requests, vital for verifying agreement fulfillment and initiating cross-chain payments.

- Aave's lending pool is integrated to supply and withdraw tokens as part of the escrow process, providing liquidity and enabling borrowing of GHO tokens for payments.

- The contract has built-in security checks and modifiers to ensure only valid parties can modify or cancel agreements and to handle error scenarios effectively.

- Custom events (`AgreementCreated`, `AgreementCancelled`, etc.) are used for logging and tracking the state of each escrow agreement.

- The contract is designed to be upgradeable and owner-controlled, with functions to handle ownership transfer and agreement fulfillment based on external data.

In summary, the Escrow smart contract leverages blockchain technology, Chainlink's cross-chain capabilities, Aave's DeFi protocols, and GHO tokens to create a secure, efficient, and decentralized escrow system for online transactions.
