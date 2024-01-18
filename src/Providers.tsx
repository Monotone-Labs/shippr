import { ChakraProvider } from "@chakra-ui/react";
import {ReactNode} from "react";

export const Providers = ({ children}: { children: ReactNode }) => {
      return (
        <ChakraProvider>
          {children}
        </ChakraProvider>
      );
}