import copy from 'clipboard-copy';
import { bool, shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import handleFavorites from '../../helpers/handleFavorites';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoriteAndShare({ id, recipe, isFood }) {
  const [copyMsg, setCopyMsg] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  const setFavorite = () => {
    if (!isMounted) {
      const type = isFood ? 'comida' : 'bebida';
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favoriteRecipes
        ? favoriteRecipes.some((item) => (item.id === id && item.type === type))
        : false;
      setFavoriteRecipe(isFavorite);
      setIsMounted(true);
    }
  };

  useEffect(setFavorite);

  let TIMEOUT_ID;

  const handleShare = () => {
    clearTimeout(TIMEOUT_ID);
    setCopyMsg(false);

    const ms = 4000;
    const regExp = /\S+[bebidas]?[comidas]\//i;
    const url = window.location.href;
    const newUrl = url.match(regExp)[0] + id;
    copy(newUrl);
    setCopyMsg(true);
    TIMEOUT_ID = setTimeout(() => {
      setCopyMsg(false);
    }, ms);
  };

  const COPY_MSG = 'Link copiado!';

  return (
    <div className="favorite-and-share">
      <div>
        <button
          type="button"
          data-testid="share-btn"
          className="share-btn"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          type="button"
          className="favorite-btn"
          onClick={ () => {
            handleFavorites(recipe, isFood);
            setFavoriteRecipe(!favoriteRecipe);
          } }
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
          />
        </button>
        {(copyMsg) ? <span className="msg-share">{COPY_MSG}</span> : ''}
      </div>
    </div>
  );
}

FavoriteAndShare.propTypes = {
  id: string.isRequired,
  recipe: shape().isRequired,
  isFood: bool,
};

FavoriteAndShare.defaultProps = {
  isFood: false,
};
