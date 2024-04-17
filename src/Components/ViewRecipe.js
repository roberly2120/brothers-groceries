import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDocument } from "../Data/firestoreOperations";
import { Spinner } from "@chakra-ui/react";

export default function ViewRecipe() {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function fetchRecipe() {
            const data = await readDocument('recipes', id);
            if (data) {
                setRecipe(data);
                setLoading(false);
                console.log(recipe)
            } else {
                console.log('No data found')
            }
        }
        fetchRecipe();
    }, [])
    if (loading || Object.keys(recipe).length === 0) {
        return (
            <>
                <Spinner size='lg' />
            </>
        )
    }
    return (
        <div>
            <h1>View Recipe</h1>
            <h3>{recipe.name}</h3>
        </div>
    )
}