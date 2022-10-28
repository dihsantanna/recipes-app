import { bool, func, number, shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import handleCopy from '../../../helpers/handleCopy';
import handleFavorites from '../../../helpers/handleFavorites';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

export default function HandleFavoriteAndShare(
  { id,
    recipe,
    isFood,
    index,
    removeFavorite,
  },
) {
  const [copyMsg, setCopyMsg] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const type = isFood ? 'comida' : 'bebida';
  const setFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favoriteRecipes
      ? favoriteRecipes.some((item) => (item.id === id))
      : false;
    setFavoriteRecipe(isFavorite);
  };

  useEffect(setFavorite);

  const handleShare = () => {
    handleCopy(setCopyMsg, { type, id });
  };

  const COPY_MSG = 'Link copiado!';
  return (
    <div className="container-icons-my-recipes">
      <button
        type="button"
        className="share-btn"
        onClick={ handleShare }
        data-testid="share-btn"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        className="favorite-btn"
        onClick={ () => {
          handleFavorites(recipe, isFood);
          setFavoriteRecipe(!favoriteRecipe);
          removeFavorite();
        } }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
        />
      </button>
      { (copyMsg) ? <p>{ COPY_MSG }</p> : '' }
    </div>
  );
}

HandleFavoriteAndShare.propTypes = {
  id: string.isRequired,
  recipe: shape().isRequired,
  isFood: bool,
  index: number.isRequired,
  removeFavorite: func,
};

HandleFavoriteAndShare.defaultProps = {
  isFood: false,
  removeFavorite: () => {},
};
