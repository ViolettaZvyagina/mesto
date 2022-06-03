import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {initialCards, 
  config, 
  elementsContainer,
  buttonEdit,
  popupEditProfile,
  popupAddCard,
  popupUserName,
  popupUserActivity,
  buttonAdd} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import '../pages/index.css';

const popupEditFormValidator = new FormValidator(config, popupEditProfile);
const popupAddFormValidator = new FormValidator(config, popupAddCard);
const popupImage = new PopupWithImage ('.popup_type_view-image');
const userInfo = new UserInfo('.profile__user-name', '.profile__user-activity');

const cardList = new Section ({
  data: initialCards, 
  renderer: (item) => {
    cardList.addItemAppend(createCardElement(item));
  },
},elementsContainer);

const popupWithFormAddCard = new PopupWithForm('.popup_type_add-card',
  {handleFormSubmit: (item) => {
    cardList.addItemPrepend(createCardElement(item));
    popupWithFormAddCard.closePopup();
  }
  });

const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit-profile',
  {handleFormSubmit: (item) => {
    userInfo.setUserInfo(item)
    popupWithFormEditProfile.closePopup();
  }
  });

function createCardElement(data) {
  const card = new Card(data, '.template-card', {handleCardClick: (item) => {
    popupImage.open(item);
  }
  });
  
  const element = card.generateCard();

  return element;
};


popupWithFormEditProfile.setEventListeners();
popupImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
cardList.renderItems();


buttonEdit.addEventListener('click', () => { 
  popupWithFormEditProfile.open()
  const getUserInfo = userInfo.getUserInfo();
  popupUserName.value = getUserInfo.name;
  popupUserActivity.value = getUserInfo.activity;
  popupEditFormValidator.checkInputsOnValidity();
});

buttonAdd.addEventListener('click', () => { 
  popupWithFormAddCard.open();
  popupAddFormValidator.checkInputsOnValidity();
});

