import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteAndShare from '../../../components/FavoriteAndShare';
import Loading from '../../../components/Loading';
import RecommendationCard from '../../../components/RecommendationCard';
import StartRecipeButton from '../../../components/StartRecipeButton';
import { fetchDrinkById, fetchSearchFoodsApi } from '../../../services/fetchApi';

function DetailsDrink({ match: { params: { id } } }) {
  const [state, setState] = useState({
    drink: [],
    isMount: false,
    isLoading: true,
    recommendations: [],
    doneRecipe: false,
    inProgressRecipe: false,
  });

  const { drink,
    isMount,
    isLoading,
    recommendations,
    doneRecipe,
    inProgressRecipe } = state;

  const initialUpdate = () => {
    const isDone = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      return doneRecipes
        ? doneRecipes.some((recipe) => (recipe.id === id && recipe.type === 'bebida'))
        : false;
    };

    const inProgress = () => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      return inProgressRecipes ? !!inProgressRecipes.cocktails[id] : false;
    };

    const getFoods = async () => {
      const foodData = await fetchSearchFoodsApi('name', '');
      const MAX_INDEX = 6;
      return foodData.filter((_food, index) => index < MAX_INDEX);
    };

    const getDrink = async () => {
      const drinkData = await fetchDrinkById(id);
      const foods = await getFoods();
      setState({
        ...state,
        drink: drinkData,
        isMount: true,
        isLoading: false,
        recommendations: foods,
        doneRecipe: isDone(),
        inProgressRecipe: inProgress(),
      });
    };

    if (!isMount) getDrink();
  };

  useEffect(initialUpdate);

  if (isLoading) return <Loading />;

  const keysDrinks = Object.keys(drink);

  const keysIngredients = keysDrinks.filter((key) => (
    key.includes('strIngredient') && !!drink[key]));

  const keysMeasures = keysIngredients.map((key) => key.match(/\d+/gi)[0]);

  return (
    <div className="details-recipe">
      <Link className="to-home" to="/bebidas">
        <i className="bi bi-house-fill" />
      </Link>
      <img
        src={ drink.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
        className="recipe-image"
      />
      <section className="recipe-title-container">
        <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
        <FavoriteAndShare
          id={ id }
          recipe={ drink }
        />
        <p
          className="subtitle"
          data-testid="recipe-category"
        >
          { `${drink.strCategory} ${drink.strAlcoholic}` }
        </p>
      </section>
      <div className="container-details-ingredients">
        <ul className="recipe-ingredients">
          { keysIngredients.map((key, index) => (
            <li
              key={ key }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${drink[key]} - ${drink[`strMeasure${keysMeasures[index]}`] || ''}` }
            </li>
          )) }
        </ul>
      </div>
      <p className="instructions" data-testid="instructions">{ drink.strInstructions }</p>
      <section className="recommendations-recipes">
        { recommendations.map((food, index) => (
          <RecommendationCard
            id={ food.idMeal }
            key={ food.strMeal + index }
            name={ food.strMeal }
            src={ food.strMealThumb }
            index={ index }
            alt={ `${food.strMeal} image` }
          />
        )) }
      </section>
      <StartRecipeButton
        doneRecipe={ doneRecipe }
        inProgress={ inProgressRecipe }
        id={ id }
      />
    </div>
  );
}

DetailsDrink.propTypes = {
  match: shape({
    params: shape({ id: string }) }).isRequired,
};

export default DetailsDrink;
