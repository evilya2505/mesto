import Popup from './Popup.js';

// Класс принимает в конструктор коллбэк сабмита формы
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handlePopupForm}) {
    super(popupSelector);
    this._handlePopupForm = handlePopupForm;
    // Находит форму, находящуюся в данном модальном окне
    this._form = this._popupElement.querySelector('.form');
  }

  // Метод, который собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.form__item'));
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  // Перезаписывает родительский метод, добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      const newValues = this._getInputValues();
      this._handlePopupForm(newValues);
      this.close();
    });
  }

  // Перезаписывает родительский метод, добавляет сброс формы
  close() {
    super.close();
    this._form.reset();
  }
}
