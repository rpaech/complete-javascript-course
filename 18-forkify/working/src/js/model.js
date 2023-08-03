import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { fetchObj } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export async function loadRecipe(id) {
  try {
    const data = await fetchObj(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (error) {
    console.error("💥", error);
    throw error;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;

    const data = await fetchObj(`${API_URL}?search=${query}`);

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
