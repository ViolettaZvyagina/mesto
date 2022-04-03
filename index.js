let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let profileUserName = content.querySelector('.profile__user-name');
let profileUserActivity = content.querySelector('.profile__user-activity');
let popupUserName = popup.querySelector('.popup__user-name');
let popupUserActivity = popup.querySelector('.popup__user-activity');
let popupSubmitButton = popup.querySelector('.popup__submit-button');
let poupForm = popup.querySelector('.popup__form');

function popupAction() {
  popup.classList.toggle('popup_opened');

  popupUserName.value = profileUserName.textContent;
  popupUserActivity.value = profileUserActivity.textContent;
}

editButton.addEventListener('click', popupAction);
closeButton.addEventListener('click', popupAction);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileUserName.textContent = popupUserName.value;
  profileUserActivity.textContent = popupUserActivity.value;

  popupAction();
}

poupForm.addEventListener('submit', formSubmitHandler);