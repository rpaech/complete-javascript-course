class SearchView {
  #parentEl = document.querySelector(".search");

  getQuery() {
    const query = this.#parentEl.querySelector(".search__field").value;
    this.#parentEl.querySelector(".search__field").value = "";
    return query;
  }

  addSearchHandler(callbackFn) {
    this.#parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      callbackFn();
    });
  }
}

export default new SearchView();
