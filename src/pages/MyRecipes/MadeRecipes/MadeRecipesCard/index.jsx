import { arrayOf, bool, number, objectOf, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import HandleFavoriteAndShare from '../../HandleFavoriteAndShare';

export default function MadeRecipesCard({ recipe, index, isFood, tags, doneDate }) {
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
          <div className="container-tag">
            { tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            )) }
          </div>
          <div className="container-data">
            <div
              data-testid={ `${index}-horizontal-done-date` }
            >
              { `Feita em: ${doneDate}` }
            </div>
          </div>
        </Link>
        <HandleFavoriteAndShare
          index={ index }
          recipe={ recipe }
          id={ id }
          isFood={ recipe.type === 'comida' }
        />
      </div>
    </div>
  );
}

MadeRecipesCard.propTypes = {
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
  tags: arrayOf(string).isRequired,
  doneDate: string.isRequired,
};
