import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import MadeRecipesCard from './MadeRecipesCard';

export default function MadeRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  function getMadeRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes || []);
    setFilteredRecipes(recipes || []);
    setIsMounted(true);
    setFilter('');
  }

  function getMadeRecipesFoods() {
    const madeRecipesFoods = doneRecipes.filter(({ type }) => type === 'comida');
    setFilteredRecipes(madeRecipesFoods);
    setFilter('comida');
  }

  function getFavoriteRecipesDrinks() {
    const madeRecipesDrinks = doneRecipes.filter(({ type }) => type === 'bebida');
    setFilteredRecipes(madeRecipesDrinks);
    setFilter('bebida');
  }

  useEffect(() => {
    if (!isMounted) getMadeRecipes();
  });

  const activeBG = 'rgb(91, 140, 22)';
  const inactiveBG = 'rgb(107, 132, 72)';
  return (
    <>
      <Header title="Receitas Feitas" />
      <div className="container-made">
        <div className="filter-container">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ getMadeRecipes }
            style={ {
              backgroundColor: `${filter === ''
                ? activeBG
                : inactiveBG}`,
            } }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ getMadeRecipesFoods }
            style={ {
              backgroundColor: `${filter === 'comida'
                ? activeBG
                : inactiveBG}`,
            } }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ getFavoriteRecipesDrinks }
            style={ {
              backgroundColor: `${filter === 'bebida'
                ? activeBG
                : inactiveBG}`,
            } }
          >
            Drink
          </button>
        </div>
        <div className="cards-container">
          { filteredRecipes.map((recipe, index) => (
            <MadeRecipesCard
              key={ index }
              index={ index }
              recipe={ recipe }
              isFood={ recipe.type === 'comida' }
              tags={ recipe.tags }
              doneDate={ recipe.doneDate }
            />
          )) }
        </div>
      </div>
    </>
  );
}
