import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Box, Text,

} from '@chakra-ui/react'

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    id: number
}

export function CancelModal({ isOpen, onClose, id }: Modal) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cancel Order #{id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box as={'form'}>
                            <Stack spacing={4}>
                                <Text fontWeight="semibold" fontSize="20px" color="black">
                                    Are you sure you want to cancel this delivery?
                                </Text>
                            </Stack>
                            <Button
                                fontFamily={'heading'}
                                mt={8}
                                w={'full'}
                                bg="red"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}>
                                Cancel
                            </Button>
                        </Box>
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}