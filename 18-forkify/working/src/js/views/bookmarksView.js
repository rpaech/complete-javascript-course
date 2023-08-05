import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _successMessage = "";

  addRenderHandler(callbackFn) {
    window.addEventListener("load", callbackFn);
  }

  _generateMarkup() {
    return this._data
      .map((recipe) => previewView._generateMarkup(recipe))
      .join("");
  }
}

export default new BookmarksView();
