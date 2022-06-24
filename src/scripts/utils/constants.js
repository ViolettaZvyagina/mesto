export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar-cover');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupEditAvatar = document.querySelector('.popup_type_edite-avatar');
export const popupUserName = document.querySelector('.popup__input_type_name');
export const popupUserActivity = document.querySelector('.popup__input_type_activity');
export const elementsContainer = document.querySelector('.elements__container');