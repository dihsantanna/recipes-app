import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesForCategory } from '../../../redux/actions';
import { fetchCategoriesFoodsApi } from '../../../services/fetchApi';

export default function FiltersRecipesFoods() {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const getCategory = useCallback((category) => (
    dispatch(fetchRecipesForCategory(category, true))
  ), [dispatch]);

  const category = useSelector((state) => state.recipesReducer.selectCategory);

  const getCategories = () => {
    const fetchCategories = async () => {
      const data = await fetchCategoriesFoodsApi();
      const zeroNumber = 0;
      const FiveNumber = 5;
      const firstFivesCategories = data.slice(zeroNumber, FiveNumber);
      setCategories(firstFivesCategories);
    };
    fetchCategories();
  };

  useEffect(getCategories, []);

  function handleClick({ target: { name } }) {
    getCategory(name === 'All' ? '' : name);
  }

  return (
    <div className="filter-recipes">
      { categories.map(({ strCategory }) => (
        <button
          className={
            `${category === strCategory ? 'selected' : ''}`
          }
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          name={ strCategory }
          onClick={ handleClick }
        >
          { strCategory }
        </button>
      )) }
      <button
        type="button"
        className={
          `${category === '' ? 'selected' : ''}`
        }
        data-testid="All-category-filter"
        onClick={ handleClick }
        name="All"
      >
        All
      </button>
    </div>
  );
}
