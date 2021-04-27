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
const formInfo = document.querySelector('.form-info');
const formAdd = document.querySelector('.form-add');
const inputName = document.querySelector('.form__item_el_name');
const inputOccupation = document.querySelector('.form__item_el_occupation');
const inputPlaceName = document.querySelector('.form__item_el_place-name');
const inputLink = document.querySelector('.form__item_el_link');
const popupPhotoImage = document.querySelector('.popup-photo__image');
const popupPhoto = document.querySelector('.popup-photo');
const cards = document.querySelector('.cards__list');

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

// ----- Добавление начального контента -----

// Перевернуть массив для правильного порядка добавления карточек
initialCards.reverse();

// Добавление начальных карточек на страницу
initialCards.forEach(card => {
  addCard(card.placeName, card.link);
});

// ----- Функции -----

// Добавляет класс popup_opened
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Удаляет класс popup_opened
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// Заполняет поля ввода в форме редактирования информации
function fillInputFields() {
  inputOccupation.value = profileOccupation.textContent;
  inputName.value = profileName.textContent;
}

// Очищает поля ввода в форме добавления карточки
function clearInputFields() {
  inputLink.value = '';
  inputPlaceName.value = '';
}

// Наполняет содержимым элементы popup-photo
function fillPhotoPopupInfo(photoIndex, nameIndex) {
  popupPhotoImage.src = photoIndex;
  popupPhotoImageName.textContent = nameIndex;
}

// Изменяет информацию о пользователе, закрывает модальное окно редактирования информации
function changeInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
}

// Сохраняет данные, введенные пользователем в форме добавления карточки, вызывает функцию добавления карточки, вызывает функцию закрытия модального окна
function saveCard(evt) {
  const newCardName = inputPlaceName.value;
  const newCardImageLink = inputLink.value;

  evt.preventDefault();
  addCard(newCardName, newCardImageLink);
  closePopup(popupAdd);
}

// Добавляет карточки на страницу
function addCard(namePlace, link) {
  // Получение содержимого заготовки вёрстки карточки
  const cardTemplate = document.querySelector('#card-template').content,
  // Клонирование содержимого заготовки вёрски карточки
        cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Наполнение карточки содержимым
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = `изображение ${namePlace}`;
  cardElement.querySelector('.card__title').textContent = namePlace;
  // Отображение карточки на странице
  cards.prepend(cardElement);

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
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    fillPhotoPopupInfo(link, namePlace);
    openPopup(popupPhoto);
  });
};

// ----- Добавление обработчиков событий -----

btnEdit.addEventListener('click', fillInputFields);
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
});

btnCloseEditPopup.addEventListener('click', () => {
  closePopup(popupEdit);
});

formInfo.addEventListener('submit', changeInfo);

btnAdd.addEventListener('click', clearInputFields);
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





