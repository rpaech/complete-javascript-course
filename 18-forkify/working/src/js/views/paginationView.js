import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");
  _errorMessage = "";
  _successMessage = "";

  addButtonHandler(callbackFn) {
    this._parentEl.addEventListener("click", (e) => {
      const button = e.target.closest(".btn--inline");
      if (!button) return;

      callbackFn(Number(button.dataset.goto));
    });
  }

  _generateMarkup() {
    const pageCount = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const page = this._data.page;

    let markup = "";
    if (pageCount > 1 && page < pageCount)
      markup += this.#generateNextButtonMarkup();
    if (pageCount > 1 && page > 1)
      markup += this.#generatePreviousButtonMarkup();

    return markup;
  }

  #generatePreviousButtonMarkup() {
    const page = this._data.page - 1;
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${page}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
      `;
  }

  #generateNextButtonMarkup() {
    const page = this._data.page + 1;
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${page}">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
  }
}

export default new PaginationView();
