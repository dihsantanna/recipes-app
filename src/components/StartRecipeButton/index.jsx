import { bool, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function StartRecipeButton({ doneRecipe, inProgress, id, isFood }) {
  return (
    !doneRecipe
      ? (
        <Link
          className="start-recipe-btn"
          to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}/in-progress` }
        >
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>
      )
      : ''
  );
}

StartRecipeButton.propTypes = {
  inProgress: bool.isRequired,
  doneRecipe: bool.isRequired,
  isFood: bool,
  id: string.isRequired,
};

StartRecipeButton.defaultProps = {
  isFood: false,
};
