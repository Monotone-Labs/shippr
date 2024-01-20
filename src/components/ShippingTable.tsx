import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer, Text, Flex, Button, useDisclosure,
} from '@chakra-ui/react'
import {CancelModal} from "./CancelModal.tsx";
import React, {useState} from "react";
import {EditModal} from "./EditModal.tsx";

const data = [
    {
        id: 1,
        origin: 'Lagos',
        destination: 'Berlin',
        departure: '2021-01-01',
        arrival: '2021-01-02',
        status: 'Delivered',
    },
    {
        id: 2,
        origin: 'Manchester',
        destination: 'Los Angeles' ,
        departure: '2021-01-01',
        arrival: '2021-01-02',
        status: 'In Transit',
    },
    {
        id: 3,
        origin: 'New York',
        destination: 'Dublin',
        departure: '2021-01-01',
        arrival: '2021-01-02',
        status: 'Canceled',
    },
    {
        id: 4,
        origin: 'Cape Town',
        destination: 'Vernice',
        departure: '2021-01-01',
        arrival: '2021-01-02',
        status: 'Delivered',
    },
    {
        id: 5,
        origin: 'Vatican City',
        destination: 'Toronto',
        departure: '2021-01-01',
        arrival: '2021-01-02',
        status: 'Delivered',
    },

]

export function ShippingTable() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
    const [selectedId, setSelectedId] = useState(0);

    const triggerCancel = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault;
        setSelectedId(id)
        onOpen()
    }

    const triggerUpdate = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault;
        setSelectedId(id)
        onUpdateOpen()
    }

    return (
        <TableContainer>
            <Text p={5} fontSize='24px' color="black" fontWeight="semibold">
                Shipment History
            </Text>
            <Table size='sm' p={1-1}>
                <Thead>
                    <Tr>
                        <Th fontSize='14px' color="black">Shipment ID</Th>
                        <Th fontSize='14px' color="black">Origin</Th>
                        <Th fontSize='14px' color="black">Destination</Th>
                        <Th fontSize='14px' color="black">Dispatch Date</Th>
                        <Th fontSize='14px' color="black">Arrival Date</Th>
                        <Th fontSize='14px' color="black">Status</Th>
                        <Th fontSize='14px' color="black">Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((datum) => {
                            return (
                                <Tr p={5} key={datum.id}>
                                    <Td p={5} >{datum.id}</Td>
                                    <Td>{datum.origin}</Td>
                                    <Td>{datum.destination}</Td>
                                    <Td>{datum.departure}</Td>
                                    <Td>{datum.arrival}</Td>
                                    <Td> <Flex align='center' justify='center' py='10px' rounded='5px' bg='green.50' borderColor='green' border="1px solid">{datum.status}</Flex></Td>
                                    <Td display='flex' gap='20px' className="flex bg-red-200 gap-[20px]">
                                        <Button onClick={(e) => triggerUpdate(datum.id, e)} colorScheme='teal' size='sm'>
                                            Edit
                                        </Button>
                                        <Button onClick={(e) => triggerCancel(datum.id, e)} variant='outline' colorScheme='red' size='sm'>
                                            Cancel
                                        </Button>
                                    </Td>
                                    <CancelModal isOpen={isOpen} onClose={onClose} id={selectedId} />
                                    <EditModal isOpen={isUpdateOpen} onClose={onUpdateClose} id={selectedId} />
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}