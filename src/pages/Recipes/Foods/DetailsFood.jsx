import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteAndShare from '../../../components/FavoriteAndShare';
import Loading from '../../../components/Loading';
import RecommendationCard from '../../../components/RecommendationCard';
import StartRecipeButton from '../../../components/StartRecipeButton';
import { fetchFoodById, fetchSearchDrinksApi } from '../../../services/fetchApi';
import Video from './Video';

function DetailsFood({ match: { params: { id } } }) {
  const [state, setState] = useState({
    food: [],
    isMount: false,
    isLoading: true,
    recommendations: [],
    doneRecipe: false,
    inProgressRecipe: false,
  });

  const { food,
    isMount,
    isLoading,
    recommendations,
    doneRecipe,
    inProgressRecipe } = state;

  const initialUpdate = () => {
    const isDone = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      return doneRecipes
        ? doneRecipes.some((recipe) => (recipe.id === id && recipe.type === 'comida'))
        : false;
    };

    const inProgress = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return inProgressRecipes ? !!inProgressRecipes.meals[id] : false;
    };

    const getDrinks = async () => {
      const drinksData = await fetchSearchDrinksApi('name', '');
      const MAX_INDEX = 6;
      return drinksData.filter((_drink, index) => index < MAX_INDEX);
    };

    const getFood = async () => {
      const foodData = await fetchFoodById(id);
      const drinks = await getDrinks();
      setState({
        ...state,
        food: foodData,
        isMount: true,
        isLoading: false,
        recommendations: drinks,
        doneRecipe: isDone(),
        inProgressRecipe: inProgress(),
      });
    };

    if (!isMount) getFood();
  };

  useEffect(initialUpdate);

  if (isLoading) return <Loading />;

  const keysFoods = Object.keys(food);

  const keysIngredients = keysFoods.filter((key) => (
    key.includes('strIngredient') && !!food[key]));

  const keysMeasures = keysIngredients.map((key) => key.match(/\d+/gi)[0]);

  return (
    <div className="details-recipe">
      <Link className="to-home" to="/comidas">
        <i className="bi bi-house-fill" />
      </Link>
      <img
        src={ food.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
        className="recipe-image"
      />
      <section className="recipe-title-container">
        <h1 data-testid="recipe-title">{ food.strMeal }</h1>
        <FavoriteAndShare
          id={ id }
          recipe={ food }
          isFood
        />
        <p
          className="subtitle"
          data-testid="recipe-category"
        >
          { food.strCategory }
        </p>
      </section>
      <div className="container-details-ingredients">
        <ul className="recipe-ingredients">
          { keysIngredients.map((key, index) => (
            <li
              key={ key }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${food[key]} - ${food[`strMeasure${keysMeasures[index]}`]}` }
            </li>
          )) }
        </ul>
      </div>
      <p className="instructions" data-testid="instructions">{ food.strInstructions }</p>
      <Video
        src={ food.strYoutube }
      />
      <section className="recommendations-recipes">
        { recommendations.map((drink, index) => (
          <RecommendationCard
            foodPage
            id={ drink.idDrink }
            key={ drink.strDrink + index }
            name={ drink.strDrink }
            src={ drink.strDrinkThumb }
            index={ index }
            alt={ `${drink.strDrink} image` }
          />
        )) }
      </section>
      <StartRecipeButton
        isFood
        doneRecipe={ doneRecipe }
        inProgress={ inProgressRecipe }
        id={ id }
      />
    </div>
  );
}

DetailsFood.propTypes = {
  match: shape({
    params: shape({ id: string }) }).isRequired,
};

export default DetailsFood;
