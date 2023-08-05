import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try again!";
  _successMessage = "";

  _generateMarkup() {
    return this._data
      .map((recipe) => previewView._generateMarkup(recipe))
      .join("");
  }
}

export default new ResultsView();
