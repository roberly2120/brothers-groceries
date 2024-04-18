import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDocument, updateDocument } from "../Data/firestoreOperations";
import { Spinner, Flex, Text, Heading, Button, Input, Center, InputGroup, InputRightElement } from "@chakra-ui/react";

export default function ViewRecipe() {
    const [recipe, setRecipe] = useState({});
    const [originalRecipe, setOriginalRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipe() {
            const data = await readDocument('recipes', id);
            if (data) {
                setRecipe(data);
                setOriginalRecipe(data);
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

    const handleIngredientEdit = (event, index) => {
        console.log(event.target.value, "index: ", index)
        setRecipe(prev => {
            let newIngredients = [...prev.ingredients];
            newIngredients[index] = event.target.value;
            return {
                ...prev,
                ingredients: newIngredients
            }
        })
    }
    const handleNameEdit = (event) => {
        setRecipe(prev => ({
            ...prev,
            name: event.target.value
        }))
    }
    const handleChangeNewIngredient = (event) => {
        setNewIngredient(event.target.value);
    }
    const handleAddIngredient = () => {
        if (newIngredient) {
            setRecipe(prev => ({
                ...prev,
                ingredients: [...prev.ingredients, newIngredient]
            }))
            setNewIngredient('');
        }
    }
    const handleRecipeUpdate = async (id) => {
        if (JSON.stringify(recipe) === JSON.stringify(originalRecipe)) {
            console.log('no changes made')
            setEditing(false);
            return
        }
        try {
            await updateDocument('recipes', id, recipe);
            setOriginalRecipe(recipe);
            setEditing(false);
        } catch (error) {
            console.error("Error updating recipe: ", error);
        }
    }

    if (loading || Object.keys(recipe).length === 0) {
        return (
            <>
                <Center mt="40%">
                    <Spinner size='lg' />
                </Center>
            </>
        )
    }
    // this is repeated code, consider refactoring
    if (!editing) {
        return (
            <Flex direction="column" align="center" mt="15px" mb="25px" w="full">
                <Heading mb="15px">{recipe.name}</Heading>
                {recipe.ingredients.map((ingredient, index) => {
                    return (
                        <Text mb="5px" key={index}>{ingredient}</Text>
                    )
                })}
                <Button mt="25px" colorScheme="blue" onClick={() => setEditing(true)}>Edit</Button>
            </Flex>
        )
    }
    // need to be able to delete ingredients, add ingredients, edit ingredients and recipe name
    else return (
        <>
            <Flex direction="column" align="center" mt="15px" w="full">
                <Input value={recipe.name} onChange={(event) => handleNameEdit(event)} mb="15px" />

                <InputGroup>
                    <Input value={newIngredient} onChange={(event) => handleChangeNewIngredient(event)} placeholder="Add Ingredient" mb="15px" />
                    <InputRightElement>
                        <Button colorScheme="blue" onClick={handleAddIngredient}>Add</Button>
                    </InputRightElement>
                </InputGroup>

                {recipe.ingredients.map((ingredient, index) => {
                    return (
                        <Flex justify="space-between" w="full" mb="5px" key={index}>
                            <Input value={ingredient} onChange={(event) => handleIngredientEdit(event, index)} />
                            <Button colorScheme="red">X</Button>
                        </Flex>
                    )
                })}
                <Button colorScheme="blue" onClick={() => handleRecipeUpdate(recipe.id)}>Done</Button>
            </Flex>
        </>
    )
}