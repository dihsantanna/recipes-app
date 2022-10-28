import { bool, func, number, objectOf, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import HandleFavoriteAndShare from '../../HandleFavoriteAndShare';

export default function FavoriteRecipesCard({ recipe, index, isFood, removeFavorite }) {
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
                { ' - ' }
                { category }
              </p>
            </div>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
          )
        }
        <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
          <h3
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
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

FavoriteRecipesCard.propTypes = {
  recipe: objectOf({
    image: string.isRequired,
    name: string.isRequired,
    category: string.isRequired,
    area: string.isRequired,
    alcoholicOrNot: string.isRequired,
    id: string.isRequired,
  }).isRequired,
  index: number.isRequired,
  isFood: bool.isRequired,
  removeFavorite: func.isRequired,
};
