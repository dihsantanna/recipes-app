import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import FavoriteRecipesCard from './FavoriteRecipesCard';

export default function FavoritesRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  function getFavoriteRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
    setFilteredRecipes(recipes);
    setIsMounted(true);
    setFilter('');
  }

  function getFavoriteRecipesFoods() {
    const favoriteFoods = favoriteRecipes.filter(({ type }) => type === 'comida');
    setFilteredRecipes(favoriteFoods);
    setFilter('comida');
  }

  function getFavoriteRecipesDrinks() {
    const favoriteDrinks = favoriteRecipes.filter(({ type }) => type === 'bebida');
    setFilteredRecipes(favoriteDrinks);
    setFilter('bebida');
  }

  const removeFavorite = () => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFilteredRecipes(recipes);
  };

  useEffect(() => {
    if (!isMounted) getFavoriteRecipes();
  });

  const activeBG = 'rgb(91, 140, 22)';
  const inactiveBG = 'rgb(107, 132, 72)';
  return (
    <>
      <Header title="Receitas Favoritas" />
      <div className="container-favorites">
        <div className="filter-container">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ getFavoriteRecipes }
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
            onClick={ getFavoriteRecipesFoods }
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
          {filteredRecipes && filteredRecipes.map((recipe, index) => (
            <FavoriteRecipesCard
              key={ index }
              index={ index }
              recipe={ recipe }
              isFood={ recipe.type === 'comida' }
              removeFavorite={ removeFavorite }
            />
          ))}
        </div>
      </div>
    </>
  );
}
