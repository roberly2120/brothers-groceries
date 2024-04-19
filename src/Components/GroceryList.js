import React, { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { readDocuments } from '../Data/firestoreOperations';
import { formatDate, getMondayOfCurrentWeek } from '../Utilities/functions';

export default function GroceryList() {
    const [groceryList, setGroceryList] = useState([]);

    useEffect(() => {
        async function fetchGroceryList() {
            const currentWeekStarting = formatDate(getMondayOfCurrentWeek()); // Use the same date calculation and formatting as in the other component
            const data = await readDocuments('weeks');
            if (data) {
                const currentWeekData = data.filter(week => week.weekStarting === currentWeekStarting);
                setGroceryList(currentWeekData[0]?.ingredients || []);
                console.log(currentWeekData)
            } else {
                console.log('No data found');
            }
        }
        fetchGroceryList();
    }, [])


    if (groceryList.length === 0) {
        return (
            <Center mt="40%">
                <Spinner size="xl" />
            </Center>
        )
    }
    return (
        <div>
            <h1>Grocery List</h1>
        </div>
    )
}