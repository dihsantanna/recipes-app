import { func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesForCategory } from '../../../redux/actions';
import { fetchCategoriesFoodsApi } from '../../../services/fetchApi';

function FiltersRecipesFoods({ getCategory, category }) {
  const [categories, setCategories] = useState([]);

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
      {categories.map(({ strCategory }) => (
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
          {strCategory}
        </button>
      ))}
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

const mapDispatchToProps = (dispatch) => ({
  getCategory: (category) => dispatch(fetchRecipesForCategory(category, true)),
});

const mapStateToProps = (state) => ({
  category: state.recipesReducer.selectCategory,
});

FiltersRecipesFoods.propTypes = {
  getCategory: func.isRequired,
  category: string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersRecipesFoods);
