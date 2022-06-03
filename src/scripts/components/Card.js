export default class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.card__delete-button');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this.card = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

  return this.card;
  }

  _deleteElement() {
    this._element.closest('.card').remove();
  }
  
  _toggleLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }
  
  generateCard() {
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
    
    return this._element;
  }
  
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._data));
    this._buttonDelete.addEventListener('click', () => this._deleteElement());
    this._buttonLike.addEventListener('click',() => this._toggleLike());
  }
}





