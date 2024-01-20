import { ChakraProvider } from "@chakra-ui/react";
import {ReactNode} from "react";
import {createConfig, WagmiConfig} from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { mainnet, polygon, sepolia } from "wagmi/chains";


const chains = [mainnet, polygon, sepolia];
const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: import.meta.env.ALCHEMY_ID,
        walletConnectProjectId: import.meta.env.WALLETCONNECT_PROJECT_ID,
        chains,
        // Required
        appName: "Shippr",

        // Optional
        appDescription: "Delivery Escrow Service",
    }),
);

export const Providers = ({ children}: { children: ReactNode }) => {
      return (
        <ChakraProvider>
            <WagmiConfig config={config} >
                <ConnectKitProvider>
                    {children}
                </ConnectKitProvider>
            </WagmiConfig>
        </ChakraProvider>
      );
}