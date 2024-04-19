import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Menu, MenuButton, MenuList, MenuItem, VStack, Button } from '@chakra-ui/react';
import { readDocuments } from '../Data/firestoreOperations';




export default function WeekofRecipesSelection() {
    const initialDays = {
        Monday: { recipeName: "", recipeId: "" },
        Tuesday: { recipeName: "", recipeId: "" },
        Wednesday: { recipeName: "", recipeId: "" },
        Thursday: { recipeName: "", recipeId: "" },
        Friday: { recipeName: "", recipeId: "" },
        Saturday: { recipeName: "", recipeId: "" },
        Sunday: { recipeName: "", recipeId: "" },
    }

    const [days, setDays] = useState(initialDays);
    const [recipeList, setRecipeList] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes() {
            const data = await readDocuments('recipes');
            if (data) {
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setRecipeList(sortedData);
            } else {
                console.log('No data found')
            }
        }
        fetchRecipes();
    }, [])

    const handleRecipeSelection = (recipe, dayKey) => {
        const updatedDays = {
            ...days,
            [dayKey]: { recipeName: recipe.name, recipeId: recipe.id }
        };
        setDays(updatedDays);
    }


    return (
        <>
            <Flex direction="column" align="center" mt="15px" w="full">
                {Object.entries(days).map(([dayKey, dayValue]) => (
                    <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} key={dayKey}>
                        <Flex justify="space-between" w="full">
                            <Flex direction="column">
                                <Text>{dayKey}</Text>
                                <Text>{dayValue.recipeName}</Text>
                            </Flex>
                            <Menu>
                                <MenuButton as={Button}>
                                    Recipes
                                </MenuButton>
                                <MenuList border="2px solid">
                                    {recipeList.map((recipe, index) => (
                                        <MenuItem key={index} onClick={() => handleRecipeSelection(recipe, dayKey)}>{recipe.name}</MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Box>
                ))}
            </Flex>

        </>
    )
}