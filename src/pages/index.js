// ----- Импорт классов и объектов из других файлов -----
import {Card} from '../components/Card.js';
import {FormValidator, formSetup} from '../components/FormValidator.js';
import {initialCards} from '../utils/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  btnEdit,
  btnAdd,
  formInfo,
  formAdd,
  cardListSelector,
  popupAddSelector,
  popupEditSelector,
  popupImageSelector,
  cardSelector
} from '../utils/constants.js';

// ----- Импорт главного css-файла -----
import './index.css';

// ----- Cоздание экземпляров классов -----
const validatingFormInfo = new FormValidator(formSetup, formInfo);
const validatingFormAdd = new FormValidator(formSetup, formAdd);
// Включение валидаций форм
validatingFormInfo.enableValidation();
validatingFormAdd.enableValidation();

const ProfileUserInfo = new UserInfo({
  userNameSelector: '.profile__name',
  descriptionSelector: '.profile__occupation'
})

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: ProfileUserInfo.setUserInfo.bind(ProfileUserInfo)
});
// Добавление обработчиков событий
popupWithEditForm.setEventListeners();

const popupWithPhoto = new PopupWithImage(popupImageSelector);
// Добавление обработчиков событий
popupWithPhoto.setEventListeners();

// Переворачивает массив для правильного порядка добавления карточек
initialCards.reverse();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardSelector, popupWithPhoto.open.bind(popupWithPhoto));
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
}, cardListSelector);
// Отрисовка карточек
cardList.renderItems();

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (formData) => {
    const card = new Card(formData, cardSelector, popupWithPhoto.open.bind(popupWithPhoto));
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
});
// Добавление обработчиков событий
popupWithAddForm.setEventListeners();

// ----- Добавление обработчиков событий -----
btnEdit.addEventListener('click', () => {
  // Заполнение данных о пользователе при открытии модального окна
  ProfileUserInfo.getUserInfo();
  // Удаляет ошибки, устанавливает правильно состояние кнопки сабмита
  validatingFormInfo.setFormState();
  // Открывает модальное окно
  popupWithEditForm.open();
});

btnAdd.addEventListener('click', () => {
  // Удаляет ошибки, устанавливает правильно состояние кнопки сабмита
  validatingFormAdd.setFormState();
  // Открывает модальное окно
  popupWithAddForm.open();
});




