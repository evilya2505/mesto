// ----- Импорт классов и объектов из других файлов -----
import {fillPhotoPopupInfo, openPopup, popupPhoto} from './index.js';

// ----- Класс, создающий карточку -----
export class Card {
  constructor(cardData, templateSelector) {
    this._placeName = cardData.placeName;
    this._link = cardData.link;
    this._cardSelector = templateSelector;
  }

  // Получение и клонирование содержимого заготовки верстки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // Добавление обработчиков событий
  _setEventListeners() {
    this._element = this._getTemplate();

    // Событие клика на лайк - добавление/удаление класса card__like-btn_active
    this._element.querySelector('.card__like-btn').addEventListener('click', evt => {
      evt.target.classList.toggle('card__like-btn_active');
    });
    // Событие клика на крестике - удаления карточки
    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
    // Событие клика на изображение - открытие модального окна с изображением
    this._element.querySelector('.card__image').addEventListener('click', () => {
      fillPhotoPopupInfo(this._link, this._placeName);
      openPopup(popupPhoto);
    });

    return this._element;
  }

  // Возвращает готовую карточку
  generateCard() {
    this._element = this._setEventListeners();
    // Сохранение элемента изображения карточки в переменной
    const cardImage = this._element.querySelector('.card__image');

    // Наполнение карточки содержимым
    cardImage.src = this._link;
    cardImage.alt = `изображение ${this._placeName}`;
    this._element.querySelector('.card__title').textContent = this._placeName;

    return this._element;
  }
}
