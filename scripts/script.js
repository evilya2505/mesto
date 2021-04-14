let btnEdit = document.querySelector('.profile__edit-btn');
let popupWindow = document.querySelector('.popup');
let btnClose = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let formElement = document.querySelector('.form');
let inputName = document.querySelector('.form__item_el_name');
let inputOccupation = document.querySelector('.form__item_el_occupation');

function openPopup() {
  inputOccupation.value = profileOccupation.textContent;
  inputName.value = profileName.textContent;
  popupWindow.classList.add('popup_opened');
}

function closePopup() {
  popupWindow.classList.remove('popup_opened');
}

function changeInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup();
}

btnClose.addEventListener('click', closePopup);

btnEdit.addEventListener('click', openPopup);

formElement.addEventListener('submit', changeInfo);



