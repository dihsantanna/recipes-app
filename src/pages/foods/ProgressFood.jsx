import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FavoriteAndShare from '../../components/FavoriteAndShare';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import handleDoneRecipes from '../../helpers/handleDoneRecipes';
import { fetchFoodById } from '../../services/fetchApi';

function ProgressFood({ match: { params: { id } } }) {
  const initialState = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage) {
      return (storage.meals[id])
        ? { ...storage }
        : { ...storage, meals: { ...storage.meals, [id]: [] } };
    }

    return {
      cocktails: {},
      meals: { [id]: [] },
    };
  };

  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ ...initialState() });
  const [btnState, setBtnState] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { meals } = state;

  const initialUpdate = () => {
    const fetchApi = async () => {
      const foods = await fetchFoodById(id);
      setRecipe(foods);
      setIsLoading(false);
    };
    fetchApi();
  };

  const keysList = Object.keys(recipe)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .filter((ele) => recipe[ele])
    .map((item) => recipe[item]);

  const updateDoneRecipes = () => {
    const finishedRecipe = () => {
      const recipeLength = keysList.length;
      const itemsListLength = meals[id].length;
      const result = recipeLength !== itemsListLength;
      setBtnState(result);
    };
    const saveInLocalStorage = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(state));
    };
    saveInLocalStorage();
    if (keysList.length) finishedRecipe();
  };

  useEffect(initialUpdate, [id]);
  useEffect(updateDoneRecipes, [id, keysList.length, meals, state]);

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    const ingredients = checked
      ? [...meals[id], name]
      : meals[id].filter((item) => item !== name);
    setState({ ...state, meals: { ...state.meals, [id]: ingredients } });
  };

  if (redirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  const decoration = (item) => (`${meals[id].includes(item) ? 'line-through' : 'none'}`);

  return (
    isLoading
      ? <Loading />
      : (
        <div className="progress-recipe">
          <Link className="to-home" to="/comidas">
            <i className="bi bi-house-fill" />
          </Link>
          <img
            className="progress-img"
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt="foto de comida"
          />
          <section className="progress-title-container">
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <FavoriteAndShare
              id={ id }
              isFood
              recipe={ recipe }
            />
            <span
              className="progress-category"
              data-testid="recipe-category"
            >
              {recipe.strCategory}
            </span>
          </section>
          <ul className="progress-recipe-ingredients">
            {keysList.map((item, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-step` }>
                <Input
                  style={ { textDecoration: decoration(item) } }
                  type="checkbox"
                  id={ item + index }
                  name={ item }
                  checked={ meals[id].includes(item) }
                  textLabel={ item }
                  onChange={ handleCheck }
                />
              </li>
            ))}
          </ul>
          <p
            className="progress-instructions"
            data-testid="instructions"
          >
            {recipe.strInstructions}
          </p>
          <button
            className="progress-btn"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ btnState }
            onClick={ () => {
              handleDoneRecipes(recipe, true);
              setRedirect(true);
            } }
          >
            Complete
          </button>
        </div>
      )
  );
}

ProgressFood.propTypes = {
  match: shape({
    params: shape({ id: string }) }).isRequired,
};

export default ProgressFood;
