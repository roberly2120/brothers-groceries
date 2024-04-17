import React, { useState, useEffect } from "react";
import { readDocuments } from "../Data/firestoreOperations";
import { Spinner, Center, Flex, Button, Text, Box } from "@chakra-ui/react";

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes() {
            const data = await readDocuments('recipes');
            if (data) {
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setRecipes(sortedData);
            } else {
                console.log('No data found')
            }
        }
        fetchRecipes();
    }, [])

    if (recipes.length === 0) {
        return (
            <Center mt="40%">
                <Spinner size='lg' />
            </Center>
        )
    }
    return (
        <>
            <Flex direction="column" align="center" mt="15px" w="full">
                {recipes.map((recipe, index) => {
                    return (
                        <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
                            <Flex justify="space-between" w="full">
                                <Text>{recipe.name}</Text>
                                <Button>View</Button>
                            </Flex>
                        </Box>
                    )
                })}
            </Flex>
        </>
    )
}