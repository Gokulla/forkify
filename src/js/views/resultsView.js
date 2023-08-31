import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(el) {
    return ` <li class="preview">
    <a class="preview__link preview__link--active" href="#${el.id}">
      <figure class="preview__fig">
        <img src="${el.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${el.title}</h4>
        <p class="preview__publisher">${el.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export default new ResultsView();
