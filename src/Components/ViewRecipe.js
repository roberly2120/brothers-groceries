import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDocument } from "../Data/firestoreOperations";
import { Spinner, Flex, Text, Heading, Button, Box } from "@chakra-ui/react";

export default function ViewRecipe() {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipe() {
            const data = await readDocument('recipes', id);
            if (data) {
                setRecipe(data);
                setLoading(false);
            } else {
                console.log('No data found')
            }
        }
        fetchRecipe();
    }, [id])

    // useEffect(() => {
    //     console.log(recipe);
    // }, [recipe])

    if (loading || Object.keys(recipe).length === 0) {
        return (
            <>
                <Spinner size='lg' />
            </>
        )
    }
    // this is repeated code, consider refactoring
    if(!editing) {
        return (
            <Flex direction="column" align="center" mt="15px" mb="25px" w="full">
                <Heading mb="15px">{recipe.name}</Heading>
                {recipe.ingredients.map((ingredient, index) => {
                    return (
                            <Text mb="5px">{ingredient}</Text>
                    )
                })}
                <Button mt="25px" colorScheme="blue" onClick={() => setEditing(true)}>Edit</Button>
            </Flex>
        )
    }

    else return (
        <>
            <Flex direction="column" align="center" mt="15px" w="full">
                <Heading mb="15px">{recipe.name}</Heading>
                
                {recipe.ingredients.map((ingredient, index) => {
                    return (
                        <Flex justify="space-between" w="full" mb="5px">
                            <Text ml="5px">{ingredient}</Text>
                            <Button colorScheme="red">X</Button>
                        </Flex>
                    )
                })}
                <Button colorScheme="blue" onClick={() => setEditing(false)}>Done</Button>
            </Flex>
        </>
    )
}