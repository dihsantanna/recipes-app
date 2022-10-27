import {
  fetchCategoriesForDrinksApi,
  fetchCategoriesForFoodsApi,
} from '../../services/fetchApi';
import fetchError from './fetchError';
import fetchSearchRecipes from './fetchSearchRecipes';
import getRecipes from './getRecipes';
import isFetching from './isFetching';
import setCategory from './setCategory';

export default function fetchRecipesForCategory(category, foodPage) {
  const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage };
  if (category === '') {
    return async (dispatch) => {
      dispatch(isFetching(true));
      dispatch(setCategory(category));
      dispatch(fetchSearchRecipes(PARAMS_NOT_FILTER));
      dispatch(isFetching(false));
    };
  }

  return async (dispatch) => {
    dispatch(isFetching());
    try {
      dispatch(setCategory(category));
      if (foodPage) {
        const recipes = await fetchCategoriesForFoodsApi(category);
        dispatch(getRecipes(recipes));
        return;
      }
      const recipes = await fetchCategoriesForDrinksApi(category);
      dispatch(getRecipes(recipes));
    } catch (error) {
      fetchError();
      console.log(error);
    }
  };
}
