// Класс, отвечающий за открытие и закрытие попапа
// Принимает в конструктор селектор попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscCloseFunction = this._handleEscClose.bind(this);
  }

  // Закрытие попапа при нажатии клавиши Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Удаляет слушатель событий, закрывающий модальное окно по нажатию на Esc
  _removeEscEventListener() {
    document.removeEventListener('keydown', this._handleEscCloseFunction);
  }

  // Добавляет слушатель событий, закрывающий модальное окно по нажатию на Esc
  _setEscEventListener() {
    document.addEventListener('keydown', this._handleEscCloseFunction);
  }

  // Открывает модальное окно
  open() {
    this._setEscEventListener();
    this._popupElement.classList.add('popup_opened');
  }

  // Закрывает модальное окно
  close() {
    this._removeEscEventListener();
    this._popupElement.classList.remove('popup_opened');
  }

  // Метод, который добавляет слушателей клика по overlay и иконке закрытия попапа
  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }
}
