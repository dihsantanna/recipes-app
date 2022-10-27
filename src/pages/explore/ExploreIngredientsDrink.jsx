import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientsCard from '../../components/IngredientsCard';
import Loading from '../../components/Loading';
import { setIngredient } from '../../redux/actions';
import { fetchIngredientsDrinksApi } from '../../services/fetchApi';

function ExploreIngredientsDrink({ changeIngredient }) {
  const [isMount, setIsMount] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [arrIngredients, setArrIngredients] = useState([]);
  const MAX_INDEX = 12;

  const fetchIngredients = async () => {
    const ingredients = await fetchIngredientsDrinksApi();
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
  if (redirect) return <Redirect to="/bebidas" />;
  if (isLoading) return <Loading />;

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="container-explore-ingredients">

        { arrIngredients.slice(0, MAX_INDEX).map(({ strIngredient1 }, index) => (
          <IngredientsCard
            key={ strIngredient1 }
            index={ index }
            name={ strIngredient1 }
            isFood={ false }
            onClick={ () => filterForIngredient(strIngredient1) }
          />)) }

      </div>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeIngredient: (ingredient) => dispatch(setIngredient(ingredient)),
});

ExploreIngredientsDrink.propTypes = {
  changeIngredient: func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExploreIngredientsDrink);
