import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../../../components/RecipeCard';

const ZERO = 0;
const TWELVE = 12;

function DrinkRecipeCards({ recipes }) {
  return (
    <section className="main-recipes">
      {recipes.slice(ZERO, TWELVE)
        .map((recipe, index) => (
          <RecipeCard
            id={ recipe.idDrink }
            key={ index }
            name={ recipe.strDrink }
            src={ recipe.strDrinkThumb }
            index={ index }
            alt={ `${recipe.strDrink} image` }
          />
        ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

DrinkRecipeCards.propTypes = {
  recipes: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(DrinkRecipeCards);
