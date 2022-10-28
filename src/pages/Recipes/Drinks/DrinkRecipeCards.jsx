import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../../../components/RecipeCard';

const ZERO = 0;
const TWELVE = 12;

export default function DrinkRecipeCards() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  return (
    <section className="main-recipes">
      { recipes.slice(ZERO, TWELVE)
        .map((recipe, index) => (
          <RecipeCard
            id={ recipe.idDrink }
            key={ index }
            name={ recipe.strDrink }
            src={ recipe.strDrinkThumb }
            index={ index }
            alt={ `${recipe.strDrink} image` }
          />
        )) }
    </section>
  );
}
