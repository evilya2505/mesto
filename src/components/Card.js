// ----- Класс, создающий карточку -----
export class Card {
  constructor(cardData, { templateSelector, handleCardClick, handleDeleteButton, currentUserID, handleLikeButton }) {
    this._cardData = cardData;
    this._placeName = cardData.placeName;
    this._link = cardData.link;
    this._cardSelector = templateSelector;
    // Ф-ция, открывающая попап с картинкой при клике на карточку
    this._handleCardClick = handleCardClick;
    // Ф-ция, открывающя попап с подтверждением удаления карточки
    this._handleDeleteButton = handleDeleteButton;
    // Количество лайков
    this._likesAmount = cardData.likes.length;
    // ID пользователя
    this._userID = currentUserID;
    // ID пользователя, создавшего карточку
    this._cardOwnerID = cardData.owner._id;
    // Ф-ция, вызывающаяся при нажатии на кнопку лайка
    this._handleLikeButton = handleLikeButton;
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
      this._handleLikeButton(this._cardData._id, evt.target, this._likesAmount);
    });
    // Событие клика на крестике - открытие попапа
    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleDeleteButton(this._element, this._cardData);
    });
    // Событие клика на изображение - открытие модального окна с изображением
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._placeName);
    });

    return this._element;
  }

  // Если пользователь не является создателем карточки, то скрывает кнопку удаления карточки
  _setDeleteButtonVisibility() {
    if (this._userID !== this._cardOwnerID) {
      // console.log(this._userID, 'is not equals', this._cardOwnerID);
      this._element.querySelector('.card__delete-btn').style.display = 'none';
    }
  }

  // Устанавливает правильное состояние кнопки лайка
  _setLikeButtonState() {
    if (this._likesAmount) {
      this._cardData.likes.forEach(like => {
        if (like._id === this._userID) {
          this._element.querySelector('.card__like-btn').classList.add('card__like-btn_active');
        }
      });
    }

    this._setLikesAmount();
  }

  // Устанавливает количество лайков
  _setLikesAmount() {
    if (this._likesAmount) {
      this._element.querySelector('.card__likes-amount').textContent = this._likesAmount;
    } else {
      this._element.querySelector('.card__likes-amount').textContent = '0';
    }
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

    this._setLikeButtonState();
    this._setDeleteButtonVisibility();

    return this._element;
  }
}
