let btnEdit = document.querySelector('.profile__edit-btn');
let popupWindow = document.querySelector('.popup');
let btnClose = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let formElement = document.querySelector('.form');
let inputName = document.querySelector('.form__name');
let inputOccupation = document.querySelector('.form__occupation');

function openPopup() {
  popupWindow.classList.add('popup_open');
}

function closePopup() {
//  checkInputs();
  popupWindow.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    closePopup();
}

btnClose.addEventListener('click', closePopup);

btnEdit.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmitHandler);



