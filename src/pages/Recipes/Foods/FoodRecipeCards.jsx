import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../../../components/RecipeCard';

const ZERO = 0;
const TWELVE = 12;

export default function FoodRecipeCards() {
  const recipes = useSelector((state) => state.recipesReducer.recipes);
  return (
    <section className="main-recipes">
      { recipes.slice(ZERO, TWELVE)
        .map((recipe, index) => (
          <RecipeCard
            foodPage
            id={ recipe.idMeal }
            key={ index }
            name={ recipe.strMeal }
            src={ recipe.strMealThumb }
            index={ index }
            alt={ `${recipe.strMeal} image` }
          />
        )) }
    </section>
  );
}
