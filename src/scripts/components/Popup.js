export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
    
    _handleEscClose (evt) {
      if (evt.key === 'Escape') {
      this.closePopup();
      }
    }

    _closePopupOnOverlay(evt) {
      if(evt.target === evt.currentTarget) {
        this.closePopup(evt.currentTarget);
      }
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
      this._buttonClose.addEventListener('click', () => this.closePopup());
      this._popup.addEventListener('mousedown',(evt) => this._closePopupOnOverlay(evt));
    }
}