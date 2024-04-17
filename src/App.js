import NewRecipeForm from './Components/Forms/NewRecipeForm';
import Home from './Components/Home';
import Header from './Components/Header';
import RecipeList from './Components/RecipeList';
import ViewRecipe from './Components/ViewRecipe';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-recipe" element={<NewRecipeForm />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<ViewRecipe />} />
      </Routes>
    </>
  );
}

export default App;
