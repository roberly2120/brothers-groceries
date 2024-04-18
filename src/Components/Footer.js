import React from 'react';
import { Box, Text, VStack, Link } from '@chakra-ui/react';


export default function Footer() {
    return (
      <Box bg="purple.400" w="100%" p={4} color="white">
          <VStack justifyContent="start">
            <Text>Johno's Recipes</Text>
          </VStack>
      </Box>
    );
  }