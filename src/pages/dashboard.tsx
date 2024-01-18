import {
    Box, Button,
    chakra, Flex,
    SimpleGrid, VStack,
} from '@chakra-ui/react'
import { FcCollect } from "react-icons/fc";
import { GrSend } from "react-icons/gr";
import {StatsCard} from "../components/StatsCard.tsx";
import Calendar from 'react-calendar';
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {ShippingTable} from "../components/ShippingTable.tsx";
import Header from "../components/Header.tsx";


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function Dashboard() {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <Box w="100vw" overflowX="hidden">
            <Header />
            <Flex bg="#fff" gap="10" justify="center"  minH="95vh" w="100vw"  pt={5} px={{ base: 2, sm: 12, md: 17 }}>
           <Box maxW="8xl" h="inherit" rounded="20px" w="inherit">
               <chakra.h1 textAlign={'left'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
                   Good morning,
               </chakra.h1>
               <Box maxW="8xl" bg="white" shadow="2xl" rounded="20px" w="inherit" p={10}>
                   <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                       <StatsCard title={'Create Purchase'} stat={'0'} icon={<GrSend size={'3em'} />} />
                       <StatsCard title={'Receive Purchase'} stat={'0'} icon={<FcCollect size={'3em'} />} />
                   </SimpleGrid>

                    <Box my={5} shadow="2xl">
                        <ShippingTable />
                    </Box>
               </Box>
           </Box>
            <VStack spacing='40px' maxW="xl" h="full" >
                <Box p={10} bg="white" shadow="2xl" rounded="20px" w="inherit">
                    <Flex align='center' justify='center' className='calendar-container'>
                        <Calendar onChange={onChange} value={value} />
                    </Flex>
                </Box>
                <Box p={10} bg="white" shadow="2xl" rounded="20px" w="full">
                    <Flex align='left' justify='center' flexDirection="column">
                        <chakra.h2 textAlign={'left'} fontSize={'2xl'} py={10} fontWeight={'bold'}>
                            Messages
                        </chakra.h2>

                        <Button  colorScheme='teal' size='lg' w="100%">View all requests</Button>
                    </Flex>
                </Box>
            </VStack>
        </Flex>
        </Box>
    )
}