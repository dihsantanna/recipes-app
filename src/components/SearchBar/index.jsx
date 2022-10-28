import { bool } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchSearchRecipes } from '../../redux/actions';
import Input from '../Input';

const MSG_ALERT = 'Sua busca deve conter somente 1 (um) caracter';

export default function SearchBar({ foodPage, open }) {
  const [search, setSearch] = useState({
    query: '',
    consultBy: 'ingredient',
    foodPage,
  });

  const dispatch = useDispatch();

  const searchRecipes = useCallback((stateSearch) => (
    dispatch(fetchSearchRecipes(stateSearch))
  ), [dispatch]);

  const setRecipes = useCallback((params) => (
    dispatch(fetchSearchRecipes(params))
  ), [dispatch]);

  const recipes = useSelector((state) => state.recipesReducer.recipes);

  const validateConsultBy = (name, value) => {
    const { query, consultBy } = search;
    const checkInput = name === 'query' && value.length > 1;
    const checkQuery = query.length === 1;
    const checkConsultBy = consultBy === 'first-letter';
    if (checkInput && checkQuery && checkConsultBy) {
      const { alert } = window;
      alert(MSG_ALERT);
      return value[0];
    }
    return value;
  };

  const handleChange = ({ target: { name, value } }) => {
    setSearch({ ...search, [name]: validateConsultBy(name, value) });
  };

  const handleSearch = () => {
    searchRecipes(search);
    setSearch({ ...search, query: '', consultBy: 'ingredient' });
  };

  const { query, consultBy } = search;

  const handlerRedirect = () => {
    const typeRecipe = foodPage ? 'comidas' : 'bebidas';
    const typeId = foodPage ? 'idMeal' : 'idDrink';

    const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage };

    setRecipes(PARAMS_NOT_FILTER);

    return <Redirect to={ `/${typeRecipe}/${recipes[0][typeId]}` } />;
  };

  return (
    <nav className={ `nav-search ${open ? 'open-search' : 'close-search'}` }>
      { recipes.length === 1
        ? handlerRedirect()
        : '' }
      <Input
        id="search-input"
        type="text"
        onChange={ handleChange }
        name="query"
        value={ query }
        classNameInput="input-searchbar"
      />
      <button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
        type="button"
        className="searchbar-btn"
      >
        Buscar
      </button>
      <div>
        <Input
          id="ingredient-search-radio"
          type="radio"
          onChange={ handleChange }
          name="consultBy"
          textLabel="Ingrediente"
          value="ingredient"
          checked={ consultBy === 'ingredient' }
          classNameInput="radio-searchbar"
        />
        <Input
          id="name-search-radio"
          type="radio"
          onChange={ handleChange }
          name="consultBy"
          textLabel="Nome"
          value="name"
          checked={ consultBy === 'name' }
          classNameInput="radio-searchbar"
        />
        <Input
          id="first-letter-search-radio"
          type="radio"
          onChange={ handleChange }
          name="consultBy"
          textLabel="Primeira Letra"
          value="first-letter"
          checked={ consultBy === 'first-letter' }
          classNameInput="radio-searchbar"
        />
      </div>
    </nav>
  );
}

SearchBar.propTypes = {
  foodPage: bool,
  open: bool.isRequired,
};

SearchBar.defaultProps = {
  foodPage: false,
};
