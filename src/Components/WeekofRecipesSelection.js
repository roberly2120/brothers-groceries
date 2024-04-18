import React from 'react';
import { Flex, Box, Text, Button} from '@chakra-ui/react';

export default function WeekofRecipesSelection() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <>
            <Flex direction="column" align="center" mt="15px" w="full">
                {days.map((day, index) => {
                    return (
                        <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} key={index}>
                            <Flex justify="space-between" w="full">
                                <Text>{day}</Text>
                                <Button colorScheme="blue">Select Recipe</Button>
                            </Flex>
                        </Box>
                    )
                })}
            </Flex>
        </>
    )
}