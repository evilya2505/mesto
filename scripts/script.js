// ----- Инициализация глобальных переменных -----
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const btnCloseEditPopup = document.querySelector('.popup-edit__close-btn');
const btnCloseAddPopup = document.querySelector('.popup-add__close-btn');
const btnClosePhotoPopup = document.querySelector('.popup-photo__close-btn');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhotoImageName = document.querySelector('.popup-photo__title');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formInfo = document.forms.changeInfo;
const formAdd = document.forms.addCard;
const inputName = formInfo.elements.name;
const inputOccupation = formInfo.elements.occupation;
const inputPlaceName = formAdd.elements.place;
const inputLink = formAdd.elements.link;
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhoto = document.querySelector('.popup-photo');
const cards = document.querySelector('.cards__list');
const popupElements = document.querySelectorAll('.popup');

// Шесть карточек «из коробки»
const initialCards = [
  {
    placeName: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    placeName: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    placeName: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    placeName: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    placeName: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    placeName: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ----- Функции -----
// Создает карточки
function createNewCard(cardData) {
  // Получение содержимого заготовки вёрстки карточки
  const cardTemplate = document.querySelector('#card-template').content;
  // Клонирование содержимого заготовки вёрски карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Сохранение элемента изображения карточки в переменной
  const cardImage = cardElement.querySelector('.card__image');

  // Наполнение карточки содержимым
  cardImage.src = cardData.link;
  cardImage.alt = `изображение ${cardData.placeName}`;
  cardElement.querySelector('.card__title').textContent = cardData.placeName;

  // --- Добавление обработчиков событий ---

  // Событие клика на лайк - добавление/удаление класса card__like-btn_active
  cardElement.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-btn_active');
  });
  // Событие клика на крестике - удаления карточки
  cardElement.querySelector('.card__delete-btn').addEventListener('click', () => {
    cardElement.remove();
  });
  // Событие клика на изображение - открытие модального окна с изображением
  cardImage.addEventListener('click', () => {
    fillPhotoPopupInfo(cardData.link, cardData.placeName);
    openPopup(popupPhoto);
  });

  return cardElement;
};

// Отображение элемента на странице
function addNewCard(cardData) {
  const cardElement = createNewCard(cardData);

  // Добавляет элемент на страницу в начало node
  cards.prepend(cardElement);
}

// Открывает модальное окно
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');

  // Добавляет слушатель событий, закрывающий модальное окно по нажатию на Esc
  window.addEventListener('keydown', checkEscButton);
}

// Закрывает модальное окно
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');

  // Очищение полей ввода и установка правильного состояния для кнопки submit
  if (popupElement === popupAdd) {
    clearInputFields();
    setFormState(formAdd, formSetup);
  } else if (popupElement === popupEdit) {
    setFormState(formInfo, formSetup);
  }

  // Удаляет слушатель событий, закрывающий модальное окно по нажатию на Esc
  window.removeEventListener('keydown', checkEscButton);
}

// Закрытие попапа при нажатии клавиши Esc
function checkEscButton(evt) {
  if (evt.key === 'Escape') {
    const currentPopupElement = document.querySelector('.popup_opened');

    closePopup(currentPopupElement);
  }
}

// Закрытие попапа при нажатии на overlay
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Заполняет поля ввода в форме редактирования информации
function fillInputFields() {
  inputOccupation.value = profileOccupation.textContent;
  inputName.value = profileName.textContent;
}

// Очищает поля ввода в форме добавления карточки
function clearInputFields() {
  formAdd.reset();
}

// Наполняет содержимым элементы popup-photo
function fillPhotoPopupInfo(photoIndex, nameIndex) {
  popupPhotoImage.src = photoIndex;
  popupPhotoImageName.textContent = nameIndex;
}

// Изменяет информацию о пользователе, закрывает модальное окно редактирования информации
function changeInfo() {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
}

// Сохраняет данные, введенные пользователем в форме добавления карточки, вызывает функцию добавления карточки, вызывает функцию закрытия модального окна
function saveCard() {
  const newCard = {
    placeName: inputPlaceName.value,
    link: inputLink.value
  }

  addNewCard(newCard);
  closePopup(popupAdd);
}
// ----- Добавление обработчиков событий -----
btnEdit.addEventListener('click', () => {
  fillInputFields();
  openPopup(popupEdit);
});

btnCloseEditPopup.addEventListener('click', () => {
  closePopup(popupEdit);
});

formInfo.addEventListener('submit', changeInfo);

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

btnCloseAddPopup.addEventListener('click', () => {
  closePopup(popupAdd);
});

formAdd.addEventListener('submit', saveCard);

btnClosePhotoPopup.addEventListener('click', () => {
  closePopup(popupPhoto);
});

// Добавление обработчиков событий для всех попапов
popupElements.forEach(popupElement => {
  popupElement.addEventListener('click', handleOverlayClick);
});

// ----- Добавление начального контента -----

// Перевернуть массив для правильного порядка добавления карточек
initialCards.reverse();

// Добавление начальных карточек на страницу
initialCards.forEach(card => {
  addNewCard(card);
});
