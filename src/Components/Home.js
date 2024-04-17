import React from 'react';
import NewRecipeForm from './Forms/NewRecipeForm';
import { Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Center>
                <Button onClick={() => navigate('/new-recipe')} colorScheme="blue">Add New Recipe</Button>
            </Center>
        </>
    )
}