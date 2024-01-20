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
    Input, Box, FormControl, FormLabel, FormHelperText,

} from '@chakra-ui/react'
import {useEffect, useState} from "react";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    category: number;
}

export function DashboardModal({ isOpen, onClose, category }: Modal) {
    const cat1 = {
        title: 'Create Purchase'
    }

    const cat2 = {
        title: 'Receive Purchase'
    }

    const [data, setData] = useState(cat1)
    useEffect(() => {
        if(category === 1) {
            setData(cat1)
        } else {
            setData(cat2)
        }
    }, [category])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{data.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box as={'form'}>
                            <Stack spacing={4}>

                                <FormControl>
                                    <FormLabel>Merchant Address</FormLabel>
                                    <Input
                                        placeholder="0x000000"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                            color: 'gray.500',
                                        }}
                                    />
                                    {/*<FormHelperText>Your merchant address.</FormHelperText>*/}
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Name of the product</FormLabel>
                                <Input
                                    placeholder="Product name"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                    {/*<FormHelperText>Your merchant address.</FormHelperText>*/}
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Amount</FormLabel>
                                <Input
                                    placeholder="200"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <FormHelperText>Amount to be deducted from your wallet and locked</FormHelperText>
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