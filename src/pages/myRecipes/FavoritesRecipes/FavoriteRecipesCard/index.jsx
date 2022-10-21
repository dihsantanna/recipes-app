import { bool, func, number, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HandleFavoriteAndShare from '../../HandleFavoriteAndShare';

function FavoriteRecipesCard({ recipe, index, isFood, removeFavorite }) {
  const { image, name, category, area, alcoholicOrNot, id } = recipe;
  return (
    <div className="container-card">
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="container-text-n-icons">
        {
          isFood ? (
            <div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { area }
                {' - '}
                {category}
              </p>
            </div>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
          )
        }
        <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
          <h3
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h3>
        </Link>
        <HandleFavoriteAndShare
          index={ index }
          recipe={ recipe }
          id={ id }
          isFood={ recipe.type === 'comida' }
          removeFavorite={ removeFavorite }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

FavoriteRecipesCard.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
  isFood: bool.isRequired,
  removeFavorite: func.isRequired,
};

export default connect(mapStateToProps)(FavoriteRecipesCard);
