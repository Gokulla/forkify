import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  getSearchResultsPerPage,
  loadRecipe,
  loadSearchResults,
  state,
} from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import ResultsView from './views/resultsView';
import paginationView from './views/paginationView';

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    // Loading data from api
    const id = window.location.hash.slice(1);
    // guard condition
    if (!id) return;
    recipeView.renderSpinner();

    await loadRecipe(id);

    // Rendering data

    recipeView.render(state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSeachResults = async function () {
  try {
    // Loading data from api
    ResultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await loadSearchResults(query);
    // Rendering data
    ResultsView.render(getSearchResultsPerPage(1));

    paginationView.render(state.search);
  } catch (err) {}
};

const controlPagination = function (go) {
  ResultsView.render(getSearchResultsPerPage(go));

  paginationView.render(state.search);
};

const init = function () {
  recipeView.addHandlerEvent(controlRecipes);
  searchView.addHandlerEvent(controlSeachResults);
  paginationView.addHandlerEvent(controlPagination);
};

init();
