export {initialCards, Card}
import {openPopup} from './utils.js'

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const popupImage = document.querySelector('.popup__image');
  const popupImageTitle = document.querySelector('.popup__image-title');
  const popupViewImage = document.querySelector('.popup_type_view-image');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    this.card = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

  return this.card;
  }

  _setPopupViewImageValues() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImageTitle.textContent = this._name;
  
  openPopup(popupViewImage);
  }

  _deleteElement() {
    this._element.closest('.card').remove();
  }
  
  _toggleLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__text').textContent = this._name;
    
    return this._element;
  }
  
  _setEventListeners() {
    const buttonDelete = this._element.querySelector('.card__delete-button');
    const buttonLike = this._element.querySelector('.card__like-button');

    this._element.querySelector('.card__image').addEventListener('click', () => this._setPopupViewImageValues());
    buttonDelete.addEventListener('click', () => this._deleteElement());
    buttonLike.addEventListener('click',() => this._toggleLike());
  }
}





