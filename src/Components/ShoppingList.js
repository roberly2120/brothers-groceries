import React, { useState, useEffect } from "react";
import { readDocuments } from "../Data/firestoreOperations";
import { formatDate, getMondayOfCurrentWeek } from "../Utilities/functions";
import { Center, Spinner, Flex, Text, Checkbox, Button, Heading } from "@chakra-ui/react";

export default function ShoppingList() {
    const [shoppingList, setShoppingList] = useState([]);
    const [weekStartingDate, setWeekStartingDate] = useState('');
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        async function fetchShoppingList() {
            const currentWeekStarting = formatDate(getMondayOfCurrentWeek());
            const reformatDate = (date) => {
                const [day, month, year] = date.split('-');
                return `${month}/${day}/${year}`;
            }
            setWeekStartingDate(reformatDate(currentWeekStarting));
            const data = await readDocuments("weeks");
            if (data) {
                const currentWeekData = data.find(week => week.weekStarting === currentWeekStarting);
                if (currentWeekData && currentWeekData.ingredientsToBuy) {
                    const shoppingListUnsorted = currentWeekData.ingredientsToBuy;
                    const sortedData = shoppingListUnsorted
                        .sort((a, b) => a.localeCompare(b))
                        .map((item, index) => ({ id: `${item.trim().toLowerCase()}-${index}`, name: item }));
                    setShoppingList(sortedData);
                } else {
                    console.log("No ingredients to buy found");
                }
            } else {
                console.log("No data found");
            }
        }
        fetchShoppingList();
    }, []);

    const handleCheckChange = (item, isChecked) => {
        setCheckedItems(prevState => ({ ...prevState, [item.id]: isChecked }));
    };

    if (shoppingList.length === 0) {
        return (
            <Center mt="40%">
                <Spinner size='xl' />
            </Center>
        );
    }
    return (
        <>
            <Heading size='md' textAlign='center'>Week Starting {weekStartingDate}</Heading>
            <Flex direction="column" align="center" mt={5} mb="25px">
                {shoppingList.map((item) => (
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
            </Flex>
        </>
    )
}