import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Menu, MenuButton, MenuList, MenuItem, VStack, Button } from '@chakra-ui/react';
import { readDocuments, createDocument, updateDocument } from '../Data/firestoreOperations';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { formatDate, getMondayOfCurrentWeek } from '../Utilities/functions';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"

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
    const navigate = useNavigate();
    const [days, setDays] = useState(initialDays);
    const [recipeList, setRecipeList] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState({});
    const [weekStarting, setWeekStarting] = useState(formatDate(getMondayOfCurrentWeek())); // use this in both fullWeekIngredientList and days. first need to reduce it to just dd-mm-yyyy
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [databaseObj, setDatabaseObj] = useState(null);
    const [existingWeekID, setExistingWeekID] = useState(null);


    useEffect(() => {

        async function fetchRecipes() {
            const data = await readDocuments('recipes');
            if (data) {
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setRecipeList(sortedData);
                // console.log(sortedData)
                let recipeObj = {};
                for (let recipe of sortedData) {
                    recipeObj[recipe.id] = false
                }
                setSelectedRecipes(recipeObj);
            } else {
                console.log('No data found')
            }
        }
        fetchRecipes();
    }, [])


    const handleOpenModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const confirmReplace = async () => {
        handleCloseModal();
        if (databaseObj) {
            await updateDocument('weeks', existingWeekID, databaseObj);
            navigate('/grocery-list');
        }
    };


    const cancelReplace = () => {
        handleCloseModal();
        // Optionally reset states or navigate away
    };

    const handleRecipeSelection = (recipe, dayKey) => {
        const updatedDays = {
            ...days,
            [dayKey]: { recipeName: recipe.name, recipeId: recipe.id }
        };
        setDays(updatedDays);
        setSelectedRecipes({ ...selectedRecipes, [recipe.id]: true });
    }

    const handleGoToGroceryList = async () => {
        let fullWeekIngredientList = [];
        for (let recipeID in selectedRecipes) {
            if (selectedRecipes[recipeID]) {
                const recipe = recipeList.find(recipe => recipe.id === recipeID);
                if (recipe && recipe.ingredients) {
                    fullWeekIngredientList = fullWeekIngredientList.concat(recipe.ingredients);
                }
            }
        }
        const newDatabaseObj = {
            weekStarting: weekStarting,
            ingredients: fullWeekIngredientList,
            days: days
        }
        const existingWeeks = await readDocuments('weeks');
        const existingWeek = existingWeeks.find(week => week.weekStarting === weekStarting);

        if (existingWeek) {
            setExistingWeekID(existingWeek.id);
            setDatabaseObj(newDatabaseObj);
            handleOpenModal('An entry for this week already exists. Would you like to replace it?');
        } else {
            try {
                await createDocument('weeks', newDatabaseObj);
                navigate('/grocery-list');
            } catch (error) {
                console.error('Error adding week to database: ', error);
            }
        }
    };




    return (
        <>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirm Replacement</ModalHeader>
                        <ModalBody>{modalContent}</ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={confirmReplace}>
                                Replace
                            </Button>
                            <Button colorScheme="red" onClick={cancelReplace}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            <Flex direction="column" align="center" mt="15px" w="full">
                {Object.entries(days).map(([dayKey, dayValue]) => (
                    <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} key={dayKey}>
                        <Flex justify="space-between" w="full">
                            <Flex direction="column">
                                <Text fontWeight="bold">{dayKey}</Text>
                                <Text color="blue">{dayValue.recipeName}</Text>
                            </Flex>
                            <Menu>
                                <MenuButton as={Button}>
                                    Recipes
                                </MenuButton>
                                <MenuList border="2px solid">
                                    {recipeList.map((recipe, index) => (
                                        <MenuItem key={index} onClick={() => handleRecipeSelection(recipe, dayKey)}>{recipe.name}{' '}{selectedRecipes[recipe.id] ? <CheckIcon color="green.500" ml="3px" /> : ""}</MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Box>
                ))}
                <Button colorScheme="blue" size="lg" mt={4} mb={4} onClick={() => handleGoToGroceryList()}>Go To Grocery List</Button>
            </Flex>

        </>
    )
}
