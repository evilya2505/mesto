import Popup from './Popup.js';

export default class PopupWithDeleteConfirmation extends Popup {
  constructor({ popupSelector, handleSubmitButton }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._handleSubmitButton = handleSubmitButton;
    this._handlerEvtSubmit = this._handlerEvtSubmit.bind(this);
  }

  // Удаление слушателя кнопки submit, иначе при следующем нажатии на сабмит (при удалении другой карточки), eventListener попытается так же удалить и предыдущую (удаленную) карточку, что вызовет ошибку 403 Forbidden
  _removeDeletingSubmitListener() {
    this._form.removeEventListener('submit', this._handlerEvtSubmit);

    // Присваивание null, чтобы в переменных не хранились данные об удаленной карточки
    this._cardElement = null;
    this._cardData = null;
  }

  _handlerEvtSubmit(evt) {
    evt.preventDefault();

    this._handleSubmitButton(this._cardElement, this._cardData)
  }

  setDeletingSubmitListener(cardElement, cardData) {
    this._cardElement = cardElement;
    this._cardData = cardData;

    this._form.addEventListener('submit', this._handlerEvtSubmit);
  }

  close() {
    this._removeDeletingSubmitListener();

    super.close();
  }
}
