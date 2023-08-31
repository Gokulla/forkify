import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const button = this._generateMarkupPreview();
    return button;
  }

  addHandlerEvent(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }

  _generateMarkupPreview() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // page 1 and having some other page
    if (this._data.page === 1 && numPage > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
     <span>Page ${curPage + 1}</span>
     <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
     </svg>
     </button>`;
    }

    // last page
    if (this._data.page === numPage && numPage > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
      </button>`;
    }

    // other page
    if (this._data.page < numPage) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
       <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
      </button>`;
    }

    // page 1 and no other page
    return `single page`;
  }
}

export default new PaginationView();
