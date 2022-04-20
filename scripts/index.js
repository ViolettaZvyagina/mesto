const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileUserName = content.querySelector('.profile__user-name');
const profileUserActivity = content.querySelector('.profile__user-activity');
const popupUserName = popup.querySelector('.popup__input_type_name');
const popupUserActivity = popup.querySelector('.popup__input_type_activity');
const popupForm = document.querySelector('[name="edite-profile"]');
const popupFormCard = document.querySelector('[name="add-card"]');
const addButton = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements__container');
const template =  document.querySelector('.template-card');
const popupUserPlace = document.querySelector('.popup__input_type_place');
const popupUserLink = document.querySelector('.popup__input_type_link');
const popupViewImage = document.querySelector('.popup_type_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');


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


function popupChangeValue() {
  popupUserName.value = profileUserName.textContent;
  popupUserActivity.value = profileUserActivity.textContent;
}

editButton.addEventListener('click', popupChangeValue);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileUserName.textContent = popupUserName.value;
  profileUserActivity.textContent = popupUserActivity.value;

  popupToggle(popupEditProfile);
}

popupForm.addEventListener('submit', formSubmitHandler);

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', () => popupToggle(popupEditProfile));
addButton.addEventListener('click', () => popupToggle(popupAddCard));
closeButtons.forEach((el) => el.addEventListener('click', () => popupToggle(el.closest('.popup'))));

function render() {
  const cards = initialCards.map(getElement);
  elementsContainer.append(...cards);
}

render();

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const elementImage = getElementTemplate.querySelector('.elements__card');
  elementImage.src = item.link;
  const elementText = getElementTemplate.querySelector('.elements__text');
  elementText.textContent = item.name;
  const deleteButton = getElementTemplate.querySelector('.elements__delete-button');
  const likeButton = getElementTemplate.querySelector('.elements__like-button');

  elementImage.addEventListener('click', () => popupViewImageChangeValue(item));
  deleteButton.addEventListener('click', deleteElement);
  likeButton.addEventListener('click', likeToggle);
  return getElementTemplate;
}

function popupViewImageChangeValue(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupImageTitle.textContent = item.name;

  popupToggle(popupViewImage);
}

function deleteElement(evt) {
  const element = evt.target.closest('.elements__element');
  element.remove();
}

function likeToggle(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

function formCreateHandler (evt) {
  evt.preventDefault();
  
  const value = getElement({name: popupUserPlace.value, link: popupUserLink.value});
  elementsContainer.prepend(value);
  
  popupToggle(popupAddCard);
  popupFormCard.reset();
}

popupFormCard.addEventListener('submit', formCreateHandler);


