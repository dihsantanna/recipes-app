import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientsCard from '../../components/IngredientsCard';
import Loading from '../../components/Loading';
import { setIngredient } from '../../redux/actions';
import { fetchIngredientsFoodsApi } from '../../services/fetchApi';

export default function ExploreIngredientsFood() {
  const [isMount, setIsMount] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [arrIngredients, setArrIngredients] = useState([]);
  const MAX_INDEX = 12;

  const dispatch = useDispatch();

  const changeIngredient = useCallback((ingredient) => (
    dispatch(setIngredient(ingredient))
  ), [dispatch]);

  const fetchIngredients = async () => {
    const ingredients = await fetchIngredientsFoodsApi();
    setIsMount(true);
    setIsLoading(false);
    setArrIngredients(ingredients);
  };

  const filterForIngredient = (ingredient) => {
    changeIngredient(ingredient);
    setRedirect(true);
  };

  useEffect(() => {
    if (!isMount) {
      fetchIngredients();
    }
  });
  if (redirect) return <Redirect to="/comidas" />;
  if (isLoading) return <Loading />;

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="container-explore-ingredients">
        { arrIngredients.slice(0, MAX_INDEX).map(({ strIngredient }, index) => (
          <IngredientsCard
            key={ strIngredient }
            index={ index }
            name={ strIngredient }
            isFood
            onClick={ () => filterForIngredient(strIngredient) }
          />)) }
      </div>
      <Footer />
    </>
  );
}
