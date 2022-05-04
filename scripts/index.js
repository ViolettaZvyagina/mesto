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
const template =  document.querySelector('.template-card');
const popupUserPlace = document.querySelector('.popup__input_type_place');
const popupUserLink = document.querySelector('.popup__input_type_link');
const popupViewImage = document.querySelector('.popup_type_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');


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

function render() {
  const cards = initialCards.map(getElement);
  elementsContainer.append(...cards);
}

render();

function getElement(item) {
  const elementTemplate = template.content.cloneNode(true);
  const elementImage = elementTemplate.querySelector('.card__image');
  elementImage.src = item.link;
  const elementText = elementTemplate.querySelector('.card__text');
  elementText.textContent = item.name;
  const buttonDelete = elementTemplate.querySelector('.card__delete-button');
  const buttonLike = elementTemplate.querySelector('.card__like-button');

  elementImage.addEventListener('click', () => setPopupViewImageValues(item));
  buttonDelete.addEventListener('click', deleteElement);
  buttonLike.addEventListener('click', toggleLike);
  return elementTemplate;
}

function setPopupViewImageValues(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupImageTitle.textContent = item.name;

  openPopup(popupViewImage);
}

function deleteElement(evt) {
  evt.target.closest('.card').remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function handleFormCreate (evt) {
  evt.preventDefault();
  
  const value = getElement({name: popupUserPlace.value, link: popupUserLink.value});
  elementsContainer.prepend(value);
  
  closePopup(popupAddCard);
  popupFormCard.reset();
}

function closePopupOnEsc (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function closePopupOnOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}




buttonEdit.addEventListener('click', setPopupProfileValues);
popupFormCard.addEventListener('submit', handleFormCreate);
popupForm.addEventListener('submit', handleFormSubmit);
buttonEdit.addEventListener('click', () => openPopup(popupEditProfile));
buttonAdd.addEventListener('click', () => openPopup(popupAddCard));
buttonsClose.forEach((el) => el.addEventListener('click', () => closePopup(el.closest('.popup'))));
popups.forEach((popup) => popup.addEventListener('mousedown', closePopupOnOverlay));

