import { bool, number, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ src, name, index, alt, id, foodPage }) {
  return (
    <div className="link-card-foods">
      <Link
        to={ `/${foodPage ? 'comidas' : 'bebidas'}/${id}` }
      >
        <div
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ src }
            alt={ alt }
          />
          <span data-testid={ `${index}-card-name` }>{ name }</span>
        </div>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  src: string.isRequired,
  name: string.isRequired,
  index: number.isRequired,
  alt: string.isRequired,
  id: string.isRequired,
  foodPage: bool,
};

RecipeCard.defaultProps = {
  foodPage: false,
};
