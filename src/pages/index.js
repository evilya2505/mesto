// ----- Импорт классов, объектов, функций из других файлов -----
import {Card} from '../components/Card.js';
import {FormValidator, formSetup} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation.js';
import Api from '../components/Api.js';
import {
  btnEdit,
  btnAdd,
  btnAvatarUpdate,
  formInfo,
  formAdd,
  formAvatarUpdate,
  cardListSelector,
  popupAddSelector,
  popupEditSelector,
  popupImageSelector,
  popupAvatarSelector,
  cardSelector,
  inputOccupation,
  inputUserName,
  userNameSelector,
  userOccupationSelector,
  userAvatarSelector,
  popupDeleteSelector
} from '../utils/constants.js';
import renderLoading from '../utils/utils.js';

// ----- Импорт главного css-файла -----
import './index.css';

const validatingFormInfo = new FormValidator(formSetup, formInfo);
const validatingFormAdd = new FormValidator(formSetup, formAdd);
const validatingFormAvatar = new FormValidator(formSetup, formAvatarUpdate);
// Включение валидаций форм
validatingFormInfo.enableValidation();
validatingFormAdd.enableValidation();
validatingFormAvatar.enableValidation();

const ProfileUserInfo = new UserInfo({
  userNameSelector: userNameSelector,
  occupationSelector: userOccupationSelector,
  avatarSelector: userAvatarSelector
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: 'e4db8d8f-a91b-49bb-ae54-5512a9b1bf9f',
    'Content-Type': 'application/json'
  }
});

const cardList = new Section({
  renderer: (item) => {
    const cardElement = createNewCard(item);

    cardList.addItem(cardElement);
  }
}, cardListSelector);

// Переменная для ID пользователя
let currentUserID = null;

// Получение и отображение информации о пользователе и карточек с сервера
api.getInitialData()
  .then((data) => {
    // Сохраняет данные о пользователе, пришедшие с сервера, в переменную
    const userInfo = data[0];
    // Сохраняет карточки, пришедшие с сервера, в переменную
    const cardsData = data[1];

    // Сохраняет ID пользователя в переменную
    currentUserID = userInfo._id;

    // Устанавливает аватарку
    ProfileUserInfo.setUserAvatar(userInfo);
    // Устанавливает информацию о пользователе
    ProfileUserInfo.setUserInfo({ occupation: userInfo.about, ...userInfo });

    // Переворачивает массив для правильного порядка отображения карточек
    cardsData.reverse();
    // Добавление карточек
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithEditForm = new PopupWithForm({
  popupSelector: popupEditSelector,
  // Изменение данных пользователя
  handlePopupForm: function(inputValues, buttonElement) {
    renderLoading({
      buttonElement: buttonElement,
      isLoading: true,
    });

    api.updateUserInfo(inputValues)
      .then((data) => {
        ProfileUserInfo.setUserInfo({ occupation: data.about, ...data });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.close();
        renderLoading({
          buttonElement: buttonElement,
          isLoading: false,
          initialText: 'Сохранить'
        });
      });
  }
});
// Добавление обработчиков событий
popupWithEditForm.setEventListeners();

const popupWithPhoto = new PopupWithImage(popupImageSelector);
// Добавление обработчиков событий
popupWithPhoto.setEventListeners();

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  // Изменение аватарки
  handlePopupForm: function(inputValue, buttonElement) {
    renderLoading({
      buttonElement: buttonElement,
      isLoading: true
    });

    api.updateUserAvatar(inputValue)
      .then((data) => {
        ProfileUserInfo.setUserAvatar(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.close();
        renderLoading({
          buttonElement: buttonElement,
          isLoading: false,
          initialText: 'Сохранить'
        });
      });
  }
});
popupWithAvatarForm.setEventListeners();

const popupWithDeleteConfirmation = new PopupWithDeleteConfirmation({
  popupSelector: popupDeleteSelector,
  // Удаление карточки
  handleSubmitButton: function(cardElement, cardData) {
    api.deleteCard(cardData)
      .then(() => {
        cardElement.remove();
        cardElement = null;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.close();
      });
  }
});
popupWithDeleteConfirmation.setEventListeners();

// Функция, отвечающая за создание экземпляра карточки
function createNewCard(item) {
  const card = new Card(item, {
    templateSelector: cardSelector,
    handleCardClick: popupWithPhoto.open.bind(popupWithPhoto),
    handleDeleteButton: function(cardElement, cardData) {
      // Открывает попап
      popupWithDeleteConfirmation.open();
      // Добавляет слушатель событий - при клике на submit происходит удаление карточки
      popupWithDeleteConfirmation.setDeletingSubmitListener(cardElement, cardData);
    },
    currentUserID: currentUserID,
    handleLikeButton: function(cardID, likeButton) {
      // Если лайк не стоит -> поставить лайк, если лайк стоит -> убрать
      if (!likeButton.classList.contains('card__like-btn_active')) {
        api.putLike(cardID)
          .catch(err => {
            console.log(err);
          });

        // Меняет цвет кнопки лайка
        likeButton.classList.add('card__like-btn_active');
        // Прибавляет единицу к актуальному числу лайков
        this._likesAmount += 1;
        // Устанавливает новое количество лайков
        this._setLikesAmount();
      } else {
        api.removeLike(cardID)
          .catch(err => {
            console.log(err);
          });

        // Меняет цвет кнопки лайка
        likeButton.classList.remove('card__like-btn_active');
        // Вычитает единицу из актуального числа лайков
        this._likesAmount -= 1;
        // Устанавливает новое количество лайков
        this._setLikesAmount();
      }
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

const popupWithAddForm = new PopupWithForm({
  popupSelector: popupAddSelector,
  // Добавление карточки
  handlePopupForm: function(formData, buttonElement) {
    renderLoading({
      buttonElement: buttonElement,
      isLoading: true
    });

    api.postCard(formData)
      .then((cardData) => {
        const cardElement = createNewCard({ placeName: cardData.name, ...cardData });

        cardList.addItem(cardElement);
      })
      .finally(() => {
        this.close();
        renderLoading({
          buttonElement: buttonElement,
          isLoading: false,
          initialText: 'Создать'
        });
      });
      }
});
// Добавление обработчиков событий
popupWithAddForm.setEventListeners();

// ----- Добавление обработчиков событий -----
btnAvatarUpdate.addEventListener('click', () => {
  // Удаляет ошибки, устанавливает правильно состояние кнопки сабмита
  validatingFormAvatar.setFormState();
  // Открывает модальное окно
  popupWithAvatarForm.open();
});

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




