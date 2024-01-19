import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,

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
                        reiiremfr renfre
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}