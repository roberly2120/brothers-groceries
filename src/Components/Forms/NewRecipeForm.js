import React, { useState, useRef, useEffect } from 'react';
import { Heading, HStack, Button, Input, VStack, Flex, Text, List, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'; // Import the AddIcon for the plus icon
import PreviousIngredientsList from './PreviousIngredientsList';
import { readDocument, updateDocument, createDocument } from '../../Data/firestoreOperations';
import { useNavigate } from 'react-router-dom';




export default function NewRecipeForm() {
    const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: [] });
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [newIngredient, setNewIngredient] = useState("");
    const ingredientInputRef = useRef(null);
    const [prevIngredientsFromDB, setPrevIngredientsFromDB] = useState([]); // This will be used to store the ingredients from the database
    const navigate = useNavigate();
    

    // Fetch the previous ingredients from the database using johno's recipe id
    useEffect(() => {
        console.log('running')
        async function fetchPreviousIngredients() {
            const data = await readDocument('previousIngredients', 'z0Zawle8cpHubAfyXEcy')
            if (data) {
                const sortedData = data.ingredients.sort((a, b) => a.localeCompare(b));
                setPrevIngredientsFromDB(sortedData)
            } else {
                console.log('No data found')
            }
        }
        fetchPreviousIngredients();
    }, []);

    const handleNameChange = (event) => {
        setNewRecipe(prev => ({ ...prev, name: event.target.value }));
    };

    const handleIngredientChange = (event) => {
        setNewIngredient(event.target.value);
    };

    const handleSubmit = () => {
        setNameSubmitted(true);
    };

    const handleAddIngredient = () => {
        if (newIngredient) {
            setNewRecipe(prev => ({
                ...prev,
                ingredients: [...prev.ingredients, newIngredient]
            }));
            // add new ingredient to the database? 
            setNewIngredient("");
            ingredientInputRef.current.focus();
        }
    };
    const handleDeleteIngredient = (index) => {
        setNewRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    }
    const handleSaveRecipe = async () => {
        // Save the recipe to the database
        const createDocRef = await createDocument('recipes', newRecipe);
        // check previous ingredients to see if the ingredient is already in the database
        const uniqueNewIngredients = newRecipe.ingredients.filter(ingredient => !prevIngredientsFromDB.includes(ingredient));
        const updateDocRef = await updateDocument('previousIngredients', 'z0Zawle8cpHubAfyXEcy', { ingredients: [...prevIngredientsFromDB, ...uniqueNewIngredients] });
        navigate('/recipes');
        
    }

    return (
        <Flex w="100%" h="100vh" p={4} align="flex-start" justify="center" mt="20px">
            <VStack spacing={4} maxW="lg" w="full">
                {!nameSubmitted ? (
                    <>
                        <HStack>
                            <Input
                                placeholder="Enter Recipe Name"
                                value={newRecipe.name}
                                onChange={handleNameChange}
                            />
                            <Button onClick={handleSubmit} colorScheme="blue">Submit</Button>
                        </HStack>
                    </>
                ) : (
                    <Flex direction="column" justify="center" align="center" w="full">
                        <Heading mb={4}>{newRecipe.name}</Heading>
                        <InputGroup size='lg' mb="15px">
                            <Input
                                placeholder="Enter New Ingredient"
                                value={newIngredient}
                                onChange={handleIngredientChange}
                                size="lg"
                                ref={ingredientInputRef}
                                maxLength={45}
                            />
                            <InputRightElement children={
                                <IconButton
                                    aria-label="Add ingredient"
                                    icon={<AddIcon w={5} h={5} />} // Increase the width and height
                                    onClick={handleAddIngredient}
                                    size="lg"
                                    p={4} // Increase padding to enlarge the button
                                    colorScheme="blue"
                                    borderRadius="3px"
                                />
                            } />
                        </InputGroup>
                        {/*
                         previousIngredients received from database
                         need to pass newRecipe.ingredients to PreviousIngredientsList 
                         */}
                        <PreviousIngredientsList previousIngredients={prevIngredientsFromDB} newRecipeIngredients={newRecipe.ingredients} setNewRecipe={setNewRecipe}/>
                        <List spacing={2} mt={4} w="full">
                            {newRecipe.ingredients.map((ingredient, index) => (
                                <Flex key={index} justify="space-between">
                                    <Text flex="1" mb="3px">{ingredient}</Text>
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        onClick={handleDeleteIngredient.bind(null, index)}
                                    >
                                        X
                                    </Button>
                                </Flex>
                            ))}
                        </List>
                        <Button
                            colorScheme="blue"
                            mt={4}
                            onClick={handleSaveRecipe}
                        >
                            Save Recipe
                        </Button>
                    </Flex>
                )}
            </VStack>
        </Flex>
    );
}
