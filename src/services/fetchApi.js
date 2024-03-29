const FOOD_INGREDIENT_SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_NAME_SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_FIRST_LETTER_SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const FOOD_DETAILS_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const FOOD_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOOD_FOR_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const FOOD_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';
const FOOD_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FOOD_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const DRINK_INGREDIENT_SEARCH_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_NAME_SEARCH_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_FIRST_LETTER_SEARCH_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const DRINK_DETAILS_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_FOR_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const DRINK_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export const fetchSearchFoodsApi = async (consultBy, query) => {
  const checkConsultBy = consultBy === 'ingredient'
    ? FOOD_INGREDIENT_SEARCH_API
    : FOOD_NAME_SEARCH_API;
  const endPoint = consultBy === 'first-letter'
    ? FOOD_FIRST_LETTER_SEARCH_API
    : checkConsultBy;
  try {
    const response = await fetch(`${endPoint}${query}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log('error');
    return [];
  }
};

export const fetchSearchDrinksApi = async (consultBy, query) => {
  const checkConsultBy = consultBy === 'ingredient'
    ? DRINK_INGREDIENT_SEARCH_API
    : DRINK_NAME_SEARCH_API;

  const endPoint = consultBy === 'first-letter'
    ? DRINK_FIRST_LETTER_SEARCH_API
    : checkConsultBy;

  try {
    const response = await fetch(`${endPoint}${query}`);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCategoriesFoodsApi = async () => {
  try {
    const response = await fetch(FOOD_CATEGORIES);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCategoriesDrinksApi = async () => {
  try {
    const response = await fetch(DRINK_CATEGORIES);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCategoriesForDrinksApi = async (category) => {
  try {
    const response = await fetch(DRINK_FOR_CATEGORY + category);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCategoriesForFoodsApi = async (category) => {
  try {
    const response = await fetch(FOOD_FOR_CATEGORY + category);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchFoodById = async (id) => {
  const endPoint = FOOD_DETAILS_BY_ID;
  try {
    const response = await fetch(`${endPoint}${id}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchDrinkById = async (id) => {
  const endPoint = DRINK_DETAILS_BY_ID;
  try {
    const response = await fetch(`${endPoint}${id}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchIngredientsFoodsApi = async () => {
  try {
    const response = await fetch(FOOD_INGREDIENTS);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRandomFood = async () => {
  try {
    const response = await fetch(FOOD_RANDOM);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRandomDrink = async () => {
  try {
    const response = await fetch(DRINK_RANDOM);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchIngredientsDrinksApi = async () => {
  try {
    const response = await fetch(DRINK_INGREDIENTS);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAreas = async () => {
  try {
    const response = await fetch(FOOD_AREAS);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchByArea = async (area) => {
  try {
    const response = await fetch(FOOD_BY_AREA + area);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
