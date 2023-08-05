import { async } from "regenerator-runtime";
import { API_URL, API_KEY, RESULTS_PER_PAGE } from "./config";
import { fetchObj } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

function createRecipeObj(data) {
  const { recipe } = data.data;
  return (state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  });
}

export async function loadRecipe(id) {
  try {
    const data = await fetchObj(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeObj(data);

    state.recipe.bookmarked = state.bookmarks.some((b) => b.id === id)
      ? true
      : false;
  } catch (error) {
    console.error("💥", error);
    throw error;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    state.search.page = 1;

    const data = await fetchObj(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error("💥", error);
    throw error;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
}

export function updateServings(qantity) {
  const modifier = qantity / state.recipe.servings;
  state.recipe.servings = qantity;
  state.recipe.ingredients.forEach((ingr) => (ingr.quantity *= modifier));
}

function persistBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
}

export function deleteBookmark(recipe) {
  const index = state.bookmarks.findIndex((el) => el.id === recipe.id);
  state.bookmarks.splice(index, 1);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
}

function clearBookmarks() {
  localStorage.removeItem("bookmarks");
}

export async function uploadRecipe(recipeData) {
  try {
    const ingredients = Object.entries(recipeData)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((entry) => {
        const ingArr = entry[1].split(",");
        if (ingArr.length !== 3)
          throw new Error("Incorrect ingredient format.");
        return {
          quantity: Number(ingArr[0]) ? Number(ingArr[0]) : null,
          unit: ingArr[1],
          description: ingArr[2],
        };
      });

    const recipe = {
      title: recipeData.title,
      source_url: recipeData.sourceUrl,
      image_url: recipeData.image,
      publisher: recipeData.publisher,
      cooking_time: Number(recipeData.cookingTime),
      servings: Number(recipeData.servings),
      ingredients: ingredients,
    };

    const data = await fetchObj(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObj(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
}

function init() {
  // clearBookmarks();
  const bookmarksData = localStorage.getItem("bookmarks");
  if (bookmarksData) state.bookmarks = JSON.parse(bookmarksData);
}
init();
