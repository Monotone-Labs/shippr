import {ReactNode} from "react";
import {Box, Flex, Stat, StatLabel, StatNumber, useColorModeValue} from "@chakra-ui/react";

interface StatsCardProps {
    title: string
    stat: string
    icon: ReactNode
    onOpen: () => void
    setCategory: (value: number) => void
    cat: number
}

export function StatsCard(props: StatsCardProps) {
    const { title, stat, icon, onOpen, setCategory, cat } = props


    const trigger = (id: number) => {
        setCategory(id);
        onOpen();
    }

    return (
        <Stat
            onClick={() => trigger(cat)}
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'2xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    )
}
