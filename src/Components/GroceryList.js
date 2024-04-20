import React, { useEffect, useState } from 'react';
import { Center, Spinner, Text, Heading, Flex, Button, Checkbox } from '@chakra-ui/react';
import { readDocuments, updateDocument } from '../Data/firestoreOperations';
import { formatDate, getMondayOfCurrentWeek } from '../Utilities/functions';
import { useNavigate } from 'react-router-dom';

export default function GroceryList() {
    const [groceryList, setGroceryList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [currentWeekDataID, setCurrentWeekDataID] = useState('');
    const [groceryListSaved, setGroceryListSaved] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchGroceryList() {
            const currentWeekStarting = formatDate(getMondayOfCurrentWeek());
            const data = await readDocuments('weeks');
            if (data) {
                const currentWeekData = data.find(week => week.weekStarting === currentWeekStarting);
                if (currentWeekData && currentWeekData.ingredients) {
                    setCurrentWeekDataID(currentWeekData.id);
                    const groceryListUnsorted = currentWeekData.ingredients;
                    const sortedData = groceryListUnsorted
                        .sort((a, b) => a.localeCompare(b))
                        .map((item, index) => ({ id: `${item.trim().toLowerCase()}-${index}`, name: item }));
                    setGroceryList(sortedData);
                }
            } else {
                console.log('No data found');
                // error handling
            }
        }
        fetchGroceryList();
    }, []);


    const handleCheckChange = (item, isChecked) => {
        setCheckedItems(prevState => ({ ...prevState, [item.id]: isChecked }))
    }

    const handleGroceryListSave = async () => {
        // filter for items that are left unchecked
        const ingredientsToBuy = groceryList.filter(item => !checkedItems[item.id]).map(item => item.name);


        const newData = { ingredientsToBuy: ingredientsToBuy };

        try {
            await updateDocument('weeks', currentWeekDataID, newData);
            setGroceryListSaved(true);
            alert('Grocery List Saved');
        } catch (error) {
            console.error('Error updating document: ', error);
        }

    }


    if (groceryList.length === 0) {
        return (
            <Center mt="40%">
                <Spinner size="xl" />
            </Center>
        )
    }
    return (
        <>
            <Flex direction='column' align='center'>
                <Heading as="h1" size="2xl" textAlign="center" mt={5}>Grocery List</Heading>
                <Text p={5}>Check the items you already have</Text>
            </Flex>
            <Flex direction="column" align="center" mt={5} mb="25px">
                {groceryList.map((item) => (
                    <Checkbox
                        key={item.id}
                        border="1px solid blue"
                        w="60%"
                        mb="5px"
                        p={4}
                        defaultChecked={false}
                        isChecked={checkedItems[item.id] || false}
                        onChange={(e) => handleCheckChange(item, e.target.checked)}
                        background={checkedItems[item] ? 'blue.100' : 'white'}
                    >
                        <Flex align="center" justify="space-between" borderRadius={5}>
                            <Text>{item.name}</Text>
                        </Flex>
                    </Checkbox>
                ))}
                {groceryListSaved ?
                    <Button colorScheme="green" size='md' mt={5} onClick={() => navigate('/shopping-list')}>View Shopping List</Button>
                    :
                    <Button colorScheme="blue" size="md" mt={5} onClick={() => handleGroceryListSave()}>Save List</Button> 
                    }
                
            </Flex>
        </>

    )
}