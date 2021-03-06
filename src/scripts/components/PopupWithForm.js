import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popup.querySelector('.popup__submit-button');
    this._initialButtonText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    });
  } 

  closePopup() {
    this._popupForm.reset();  
    super.closePopup();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSubmit.textContent = 'Загрузка...';
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.textContent = this._initialButtonText;
      this._buttonSubmit.disabled = false;
    }
  }
}