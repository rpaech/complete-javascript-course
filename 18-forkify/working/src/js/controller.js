import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import { WINDOW_TIMEOUT_DURATION } from "./config";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// if (module.hot) {
//   module.hot.accept();
// }

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

async function controlSearch() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
}

function controlPagination(page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
}

function controlServings(servings) {
  model.updateServings(servings);
  recipeView.update(model.state.recipe);
}

function controlBookmarkButton() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    addRecipeView.renderMessage();
    setTimeout(
      () => addRecipeView.toggleWindowVisibility(),
      WINDOW_TIMEOUT_DURATION
    );
  } catch (error) {
    console.warn(error);
    addRecipeView.renderError(error.message);
  }
}

function init() {
  bookmarksView.addRenderHandler(controlBookmarks);
  recipeView.addRenderHandler(controlRecipes);
  recipeView.addServingsHandler(controlServings);
  recipeView.addAddBookmarkHandler(controlBookmarkButton);
  searchView.addSearchHandler(controlSearch);
  paginationView.addButtonHandler(controlPagination);
  addRecipeView.addUploadHandler(controlAddRecipe);
}
init();
