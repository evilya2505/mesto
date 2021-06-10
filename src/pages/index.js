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
  cardSelector,
  inputOccupation,
  inputUserName,
  userNameSelector,
  userOccupationSelector
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
  userNameSelector: userNameSelector,
  occupationSelector: userOccupationSelector
})

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEditSelector,
  handlePopupForm: ProfileUserInfo.setUserInfo.bind(ProfileUserInfo)
});
// Добавление обработчиков событий
popupWithEditForm.setEventListeners();

const popupWithPhoto = new PopupWithImage(popupImageSelector);
// Добавление обработчиков событий
popupWithPhoto.setEventListeners();

// Переворачивает массив для правильного порядка добавления карточек
initialCards.reverse();

// Функция, отвечающая за создание экземпляра карточки
function createNewCard(item) {
  const card = new Card(item, cardSelector, popupWithPhoto.open.bind(popupWithPhoto));
  const cardElement = card.generateCard();

  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);

    cardList.addItem(cardElement);
  }
}, cardListSelector);
// Отрисовка карточек
cardList.renderItems();

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAddSelector,
  handlePopupForm: (formData) => {
    const cardElement = createNewCard(formData);

    cardList.addItem(cardElement);
  }
});
// Добавление обработчиков событий
popupWithAddForm.setEventListeners();

// ----- Добавление обработчиков событий -----
btnEdit.addEventListener('click', () => {
  // Заполнение данных о пользователе при открытии модального окна
  const userData = ProfileUserInfo.getUserInfo();
  inputOccupation.value = userData.occupation;
  inputUserName.value = userData.name;
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




