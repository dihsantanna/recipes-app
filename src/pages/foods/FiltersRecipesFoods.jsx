import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesForCategory, fetchSearchRecipes } from '../../redux/actions';
import { fetchCategoriesFoodsApi } from '../../services/fetchApi';

const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: true };

function FiltersRecipesFoods({ getCategory, recipesNotFilter }) {
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isToggle, setIsToggle] = useState('');
  const [category, setCategory] = useState('All');
  const [isFilteredCategory, setFilteredCategory] = useState(false);

  const getCategories = () => {
    const fetchCategories = async () => {
      const data = await fetchCategoriesFoodsApi();
      const FiveNumber = 5;
      const firstFivesCategories = data.filter((_item, index) => index < FiveNumber);
      setCategories(firstFivesCategories);
      setIsMounted(true);
    };
    if (!isMounted) fetchCategories();
  };

  useEffect(getCategories);

  function handleClick({ name }) {
    if (!isFilteredCategory || isToggle !== name) {
      setCategory(name);
      getCategory(name);
      setFilteredCategory(true);
      return setIsToggle(name);
    }
    setCategory('All');
    recipesNotFilter();
    setFilteredCategory(false);
  }

  function setCategoryAll() {
    setCategory('All');
    recipesNotFilter();
    setFilteredCategory(false);
  }

  return (
    <div className="filter-recipes">
      {categories.map(({ strCategory }) => (
        <button
          className="filter-recipes-btn"
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          name={ strCategory }
          onClick={ ({ target }) => handleClick(target) }
          style={ {
            backgroundColor: category === strCategory
              ? 'rgb(91, 140, 22)'
              : 'rgb(107, 132, 72)',
          } }
        >
          {strCategory}
        </button>
      ))}
      <button
        style={ {
          backgroundColor: category === 'All'
            ? 'rgb(91, 140, 22)'
            : 'rgb(107, 132, 72)',
        } }
        type="button"
        data-testid="All-category-filter"
        onClick={ setCategoryAll }
        name="All"
      >
        All
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCategory: (category) => dispatch(fetchRecipesForCategory(category, true)),
  recipesNotFilter: () => dispatch(fetchSearchRecipes(PARAMS_NOT_FILTER)),
});

FiltersRecipesFoods.propTypes = {
  getCategory: func.isRequired,
  recipesNotFilter: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FiltersRecipesFoods);
