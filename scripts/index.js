export {openPopup, closePopup}
import {initialCards, Card} from './Card.js';

const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const profileUserName = content.querySelector('.profile__user-name');
const profileUserActivity = content.querySelector('.profile__user-activity');
const popupUserName = popup.querySelector('.popup__input_type_name');
const popupUserActivity = popup.querySelector('.popup__input_type_activity');
const popupForm = document.querySelector('[name="edite-profile"]');
const popupFormCard = document.querySelector('[name="add-card"]');
const buttonAdd = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__container');
//const template =  document.querySelector('.template-card');
const popupUserPlace = document.querySelector('.popup__input_type_place');
const popupUserLink = document.querySelector('.popup__input_type_link');
const popupViewImage = document.querySelector('.popup_type_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupFormButton = popupForm.querySelector('.popup__submit-button');
const popupFormCardButton = popupFormCard.querySelector('.popup__submit-button');

function setPopupProfileValues() {
  popupUserName.value = profileUserName.textContent;
  popupUserActivity.value = profileUserActivity.textContent;
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileUserName.textContent = popupUserName.value;
  profileUserActivity.textContent = popupUserActivity.value;
  
  closePopup(popupEditProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function handleFormCreate (evt) {
  evt.preventDefault();
  
  const item = new Card({name: popupUserPlace.value, link: popupUserLink.value}, '.template-card');
  const value = item.generateCard();
  elementsContainer.prepend(value);
  
  closePopup(popupAddCard);
  popupFormCard.reset();
}


function closePopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupOnOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

popupFormCard.addEventListener('submit', handleFormCreate);
popupForm.addEventListener('submit', handleFormSubmit);
buttonEdit.addEventListener('click', () => { 
  openPopup(popupEditProfile);
  setPopupProfileValues();
  checkInputsOnValidity(popupForm,config);
});

buttonAdd.addEventListener('click', () => { 
  popupFormCard.reset();
  openPopup(popupAddCard)
  checkInputsOnValidity(popupFormCard,config);
});

buttonsClose.forEach((el) => el.addEventListener('click', () => closePopup(el.closest('.popup'))));
popups.forEach((popup) => popup.addEventListener('mousedown', closePopupOnOverlay));

initialCards.forEach((item) => {
  const card = new Card(item, '.template-card');
  const cardElement = card.generateCard();

  elementsContainer.append(cardElement);
}); 




