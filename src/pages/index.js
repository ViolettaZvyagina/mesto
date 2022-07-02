import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import { 
  config, 
  elementsContainer,
  buttonEditProfile,
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  popupUserName,
  popupUserActivity,
  buttonAdd,
  buttonEditAvatar,
  } from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import '../pages/index.css';

const popupEditFormValidator = new FormValidator(config, popupEditProfile);
const popupAddFormValidator = new FormValidator(config, popupAddCard);
const popupEditAvatarValidator = new FormValidator(config, popupEditAvatar);
const popupImage = new PopupWithImage ('.popup_type_view-image');
const userInfo = new UserInfo('.profile__user-name', '.profile__user-activity', '.profile__avatar');

const cardList = new Section ({
  renderer: (item) => {
    cardList.addItemAppend(createCardElement(item));
  },
},elementsContainer);

const popupWithFormAddCard = new PopupWithForm('.popup_type_add-card',
  {handleFormSubmit: (dataInputs) => {
    popupWithFormAddCard.renderLoading(true);
    api.addCard(dataInputs)
      .then((card) => {
        cardList.addItemPrepend(createCardElement(card));
        popupWithFormAddCard.closePopup();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        popupWithFormAddCard.renderLoading(false);
      })
    }
  });

const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit-profile',
  {handleFormSubmit: (data) => {
    popupWithFormEditProfile.renderLoading(true);
    api.setUsersInfo(data)
      .then((objectUserInfo) => {
        userInfo.setUserInfo(objectUserInfo)
        popupWithFormEditProfile.closePopup();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        popupWithFormEditProfile.renderLoading(false);
      })
    }
  });

const popupWithFormEditAvatar = new PopupWithForm('.popup_type_edite-avatar',
 {handleFormSubmit: (data) => {
  popupWithFormEditAvatar.renderLoading(true);
  api.setUserAvatar(data)
    .then((objectUserInfo) => {
      userInfo.setUserInfo(objectUserInfo)
      popupWithFormEditAvatar.closePopup();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      popupWithFormEditAvatar.renderLoading(false);
    })
  }
 });

 const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirmation')

const api = new Api({ 
    url:'https://nomoreparties.co/v1/cohort-43', 
    headers: {
    authorization: '542751f4-2e93-4fad-82e3-6e5a73ce5b6d',
    'Content-Type': 'application/json'
  }
});

let userData;

Promise.all([api.getUsersInfo(), api.getCards()])
  .then(([objectUserInfo, cards]) => {
    userData = objectUserInfo;

    userInfo.setUserInfo(objectUserInfo);
    cardList.renderItems(cards);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });

function createCardElement(data) {
  const card = new Card({
    data: data, 
    templateSelector: '.template-card', 
    userData: userData, 
    handleCardClick: (item) => {
    popupImage.open(item);
  },
    handleDeleteCardClick: (cardInfo) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setSubmit(() => {
      api.deleteCard(cardInfo)
        .then(() => {
          card.deleteElement();
          popupWithConfirmation.closePopup();
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
      });
    },
    handleLikes: (cardInfo  ) => {
      if(card.isLiked()) {
        api.deleteLike(cardInfo)
          .then((item) => {
            card.setLikesCount(item)
            card.deleteLike();
          })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          });
        } else {
          api.setLike(cardInfo)
            .then((item) => {
              card.setLikesCount(item)
              card.addLike();
            })
            .catch((error) => {
              console.log(`Ошибка: ${error}`);
            });
        }
    }
  });

  const element = card.generateCard(data);

  return element;
};

popupWithFormEditProfile.setEventListeners();
popupImage.setEventListeners();
popupWithFormEditAvatar.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithConfirmation.setEventListeners();

popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupEditAvatarValidator.enableValidation();

buttonEditAvatar.addEventListener('click', () => {
  popupWithFormEditAvatar.open();
  popupEditAvatarValidator.checkInputsOnValidity();
});

buttonEditProfile.addEventListener('click', () => { 
  popupWithFormEditProfile.open()
  const getUserInfo = userInfo.getUserInfo();
  popupUserName.value = getUserInfo.name;
  popupUserActivity.value = getUserInfo.about;
  popupEditFormValidator.checkInputsOnValidity();
});

buttonAdd.addEventListener('click', () => { 
  popupWithFormAddCard.open();
  popupAddFormValidator.checkInputsOnValidity();
});
