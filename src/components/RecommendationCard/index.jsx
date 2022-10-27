import { bool, number, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function RecommendationCard({ src, name, index, alt, id, foodPage }) {
  return (
    <Link
      to={ `/${!foodPage ? 'comidas' : 'bebidas'}/${id}` }
    >
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          src={ src }
          alt={ alt }
        />
        <span data-testid={ `${index}-recomendation-title` }>{ name }</span>
      </div>
    </Link>
  );
}

RecommendationCard.propTypes = {
  src: string.isRequired,
  name: string.isRequired,
  index: number.isRequired,
  alt: string.isRequired,
  id: string.isRequired,
  foodPage: bool,
};

RecommendationCard.defaultProps = {
  foodPage: false,
};
