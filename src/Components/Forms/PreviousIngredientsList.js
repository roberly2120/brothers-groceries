import React from 'react';
import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function PreviousIngredientsList(props) {
    const { previousIngredients, newRecipeIngredients, setNewRecipe } = props;

    const handleAddIngredient = (ingredient) => {
        // Add the ingredient to the new recipe
        setNewRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient]
        }))
    }
    return (
        <>
            <Box
                w='full'
                h='200px'
                p={4}
                bg="gray.100"
                borderRadius="md"
                overflowY="auto"
                border="1px"
                borderColor="gray.200"
            >
                {previousIngredients.length > 0 ? (
                    previousIngredients.map((ingredient, index) => (
                        <Flex key={index} justify="space-between" mb="3px">
                            <Text pt={2}>{ingredient}</Text>
                            <IconButton
                                aria-label="Add ingredient"
                                icon={<AddIcon w={5} h={5} />} // Increase the width and height
                                onClick={() => handleAddIngredient(ingredient)}
                                size="lg"
                                p={4} // Increase padding to enlarge the button
                                colorScheme="blue"
                                borderRadius="3px"
                            />
                        </Flex>

                    ))
                ) : (
                    <Text textAlign="center">No ingredients yet</Text>
                
            )}
            </Box>
        </>
    )
}