import { bool, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { fetchSearchRecipes, setIngredient } from '../../redux/actions';
import setCategory from '../../redux/actions/setCategory';
import DrinkRecipeCards from './DrinkRecipeCards';
import FiltersRecipesDrinks from './FiltersRecipesDrinks';

function Drinks({
  setRecipes, isFetching, selectIngredient, changeIngredient, changeCategory,
}) {
  const [isMount, setIsMount] = useState(false);
  const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: false };
  const FILTER_BY_INGREDIENT = { query: selectIngredient,
    consultBy: 'ingredient',
    foodPage: false };
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
      {isFetching
        ? <Loading />
        : (
          <>
            <FiltersRecipesDrinks />
            <DrinkRecipeCards />
          </>
        )}
      <Footer />
    </>
  );
}
Drinks.propTypes = {
  setRecipes: func.isRequired,
  isFetching: bool.isRequired,
  changeIngredient: func.isRequired,
  selectIngredient: string,
  changeCategory: func.isRequired,
};
Drinks.defaultProps = {
  selectIngredient: '',
};
const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
  selectIngredient: state.recipesReducer.selectIngredient,
});
const mapDispatchToProps = (dispatch) => ({
  setRecipes: (params) => dispatch(fetchSearchRecipes(params)),
  changeIngredient: (ingredient) => dispatch(setIngredient(ingredient)),
  changeCategory: (category) => dispatch(setCategory(category)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
