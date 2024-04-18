import React from 'react';
import { Box } from '@chakra-ui/react';
import NewRecipeForm from './Components/Forms/NewRecipeForm';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RecipeList from './Components/RecipeList';
import ViewRecipe from './Components/ViewRecipe';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-recipe" element={<NewRecipeForm />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<ViewRecipe />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
