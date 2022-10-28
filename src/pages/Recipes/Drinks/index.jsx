import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import { fetchSearchRecipes, setIngredient } from '../../../redux/actions';
import setCategory from '../../../redux/actions/setCategory';
import DrinkRecipeCards from './DrinkRecipeCards';
import FiltersRecipesDrinks from './FiltersRecipesDrinks';

export default function Drinks() {
  const [isMount, setIsMount] = useState(false);

  const isFetching = useSelector((state) => state.recipesReducer.isFetching);

  const selectIngredient = useSelector((state) => state.recipesReducer.selectIngredient);

  const dispatch = useDispatch();

  const setRecipes = useCallback((params) => (
    dispatch(fetchSearchRecipes(params))
  ), [dispatch]);

  const changeIngredient = useCallback((ingredient) => (
    dispatch(setIngredient(ingredient))
  ), [dispatch]);

  const changeCategory = useCallback((category) => (
    dispatch(setCategory(category))
  ), [dispatch]);

  const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: false };

  const FILTER_BY_INGREDIENT = { query: selectIngredient,
    consultBy: 'ingredient',
    foodPage: false,
  };

  const fetchRecipes = () => {
    if (!isMount) {
      setRecipes(selectIngredient ? FILTER_BY_INGREDIENT : PARAMS_NOT_FILTER);
      changeIngredient('');
      changeCategory('');
      setIsMount(true);
    }
  };

  useEffect(fetchRecipes);

  return (
    <>
      <Header title="Bebidas" showButton />
      <FiltersRecipesDrinks />
      { isFetching
        ? <Loading />
        : (
          <DrinkRecipeCards />
        ) }
      <Footer />
    </>
  );
}
