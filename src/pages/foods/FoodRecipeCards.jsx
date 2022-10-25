import { arrayOf, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';

const ZERO = 0;
const TWELVE = 12;

function FoodRecipeCards({ recipes }) {
  return (
    <section className="main-recipes">
      {recipes.slice(ZERO, TWELVE)
        .map((recipe, index) => (
          <RecipeCard
            foodPage
            id={ recipe.idMeal }
            key={ index }
            name={ recipe.strMeal }
            src={ recipe.strMealThumb }
            index={ index }
            alt={ `${recipe.strMeal} image` }
          />
        ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

FoodRecipeCards.propTypes = {
  recipes: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(FoodRecipeCards);
