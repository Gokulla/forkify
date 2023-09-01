import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RESULTS_PER_PAGE,
  },
  page: 1,
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}${id}`;
    const data = await getJSON(url);
    let { recipe } = data.data;

    // Formatting recipes
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const url = `${API_URL}?search=${query}`;
    const data = await getJSON(url);

    state.search.results = data.data.recipes.map(re => {
      return {
        id: re.id,
        title: re.title,
        publisher: re.publisher,
        image: re.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
