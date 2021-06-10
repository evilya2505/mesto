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

  // Закрытие попапа при нажатии на overlay
  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
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
    // Находит элемент кнопки закрытия попапа
    const btnClose = this._popupElement.querySelector('.popup__close-btn');

    // Добавляет слушатель событий, закрывающий модальное окно по нажатию на крестик
    btnClose.addEventListener('click', this.close.bind(this));
    // Добавляет слушатель событий, закрывающий модальное окно по нажатию на overlay
    this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
  }
}
