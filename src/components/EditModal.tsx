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
    Box, FormControl, FormLabel, Input, FormHelperText,

} from '@chakra-ui/react'

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    id: number
}

export function EditModal({ isOpen, onClose, id }: Modal) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Order #{id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box as={'form'}>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>Tracking Code</FormLabel>
                                    <Input
                                        placeholder="23DEV2"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                    />
                                    <FormHelperText>Your tracking code from www.ship24.com</FormHelperText>
                                </FormControl>
                            </Stack>
                            <Button
                                fontFamily={'heading'}
                                mt={8}
                                w={'full'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}>
                                Submit
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