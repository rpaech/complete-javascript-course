import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _buttonOpen = document.querySelector(".nav__btn--add-recipe");
  _buttonClose = document.querySelector(".btn--close-modal");

  _successMessage = "Upload successful!";

  constructor() {
    super();
    this.#addShowWindowHandler();
    this.#addHideWindowHandler();
  }

  toggleWindowVisibility() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  #addShowWindowHandler() {
    this._buttonOpen.addEventListener("click", () => {
      this.toggleWindowVisibility();
    });
  }

  #addHideWindowHandler() {
    this._buttonClose.addEventListener("click", () => {
      this.toggleWindowVisibility();
    });
  }

  addUploadHandler(callbackFn) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this._parentEl)]);
      callbackFn(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
