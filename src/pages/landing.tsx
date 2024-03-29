import {Box, Container, Flex, Image, Text, VStack} from "@chakra-ui/react";
import LandingImage from "../assets/landing.png"
import {ConnectKitButton} from "connectkit";

const LandingPage = () => {
    return (
        <Container bgGradient='linear(to-r, #5B86E5, #36D1DC)' minW="100vw" h="100vh">
            <Flex w="full" align="center" justify="center" h="inherit">
                <Box  w="inherit">
                    <VStack color="white" align="left" ml="400px">
                        <Text fontSize="72" fontWeight="bold">Shippr</Text>
                        <Text fontSize="24" fontWeight="semibold">Exquisite escrow service</Text>

                        <ConnectKitButton />

                    </VStack>
                </Box>
                <Flex w="inherit" justify="center">
                    <Image w="600px"  alt="Landing Image" src={LandingImage} />
                </Flex>
            </Flex>
        </Container>
    )
}

export default LandingPage;