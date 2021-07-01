import Popup from './Popup.js';

export default class PopupWithDeleteConfirmation extends Popup {
  constructor({ popupSelector, handleSubmitButton }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._handleSubmitButton = handleSubmitButton;
  }

  setDeletingSubmitListener(cardElement, cardData) {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitButton(cardElement, cardData);

      this.close();
    });
  }
}
