import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import RecipeCard from '../../components/RecipeCard';
import { fetchAreas, fetchByArea, fetchSearchFoodsApi } from '../../services/fetchApi';

export default function ExploreFoodsByArea() {
  const [isMounted, setIsMounted] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectArea, setSelectArea] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ZERO = 0;
  const TWELVE = 12;

  const twelveFirst = (getRecipes) => (
    getRecipes.slice(ZERO, TWELVE)
  );

  const getInitialState = async () => {
    const getRecipes = await fetchSearchFoodsApi('name', '');
    const getAreas = await fetchAreas();
    setAreas(getAreas);
    setRecipes(twelveFirst(getRecipes));
    setIsMounted(true);
    setIsLoading(false);
  };

  const handleFilter = () => {
    setIsLoading(true);
    const filterRecipes = async () => {
      const getRecipes = selectArea
        ? await fetchByArea(selectArea)
        : await fetchSearchFoodsApi('name', '');
      setRecipes(twelveFirst(getRecipes));
      setIsLoading(false);
    };
    filterRecipes();
  };

  useEffect(handleFilter, [selectArea]);

  useEffect(() => {
    if (!isMounted) getInitialState();
  });

  const setArea = ({ target }) => {
    setSelectArea(target.value);
  };

  return (
    <div className="explore-container">
      <Header title="Explorar Origem" showButton foodPage />
      <section className="dropdown-container">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ setArea }
          className="select-explore"
        >
          <option
            value=""
            data-testid="All-option"
            disabled={ selectArea === '' }
            selected
          >
            All
          </option>
          { areas.map(({ strArea }, index) => (
            <option
              key={ strArea + index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
              disabled={ selectArea === strArea }
            >
              { strArea }
            </option>
          )) }
        </select>
      </section>
      <section className="main-recipes">
        { isLoading
          ? <Loading />
          : recipes.map((recipe, index) => (
            <RecipeCard
              key={ index }
              foodPage
              src={ recipe.strMealThumb }
              name={ recipe.strMeal }
              index={ index }
              alt={ `${recipe.strMeal} image` }
              id={ recipe.idMeal }
            />
          )) }
      </section>
      <Footer />
    </div>
  );
}
