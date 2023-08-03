import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

async function controlSearch() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search);
  } catch (error) {
    console.error(error);
  }
}

function init() {
  recipeView.addRenderHandler(controlRecipes);
  searchView.addSearchHandler(controlSearch);
}
init();
