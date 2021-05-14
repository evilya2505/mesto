const formSetup = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}

/* Устанавливает правильное состояние для кнопки сохранения и ошибок (
    Удаляет все ошибки, которые появились, если пользователь ввел невалидные данные и закрыл попап;
    Устанавливает нужное состояние кнопке сохранения) */
function setFormState (formElement, formSetup) {
  const inputList = Array.from(formElement.querySelectorAll(`${formSetup.inputSelector}`));
  const buttonElement = formElement.querySelector(`${formSetup.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, formSetup);
  });

  toggleButtonState(inputList,buttonElement, formSetup);
}

// Отображение ошибки при невалидном значении в поле ввода
function showError(formElement, inputElement, errorMessage, formSetup) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

  inputElement.classList.add(`${formSetup.inputErrorClass}`);
  errorElement.classList.add(`${formSetup.errorClass}`);
  errorElement.textContent = errorMessage;
}

// Скрывает ошибку при валидном значении в поле ввода
function hideError(formElement, inputElement, formSetup) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

  inputElement.classList.remove(`${formSetup.inputErrorClass}`);
  errorElement.classList.remove(`${formSetup.errorClass}`);
  errorElement.textContent = '';
}

// Проверяет валидность значений в поле ввода
function checkInputValidity(formElement, inputElement, formSetup) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, formSetup);
  } else {
    hideError(formElement, inputElement, formSetup);
  }
}

// Проверяет есть ли поля с невалидными значениями в форме
function hasInvalidInput(inputList) {
  return inputList.some((formElement) => {
    return !formElement.validity.valid;
    });
}

// Устанавливает обработчики событий на элементы формы
function setEventListeners(formElement, formSetup) {
  const inputList = Array.from(formElement.querySelectorAll(`${formSetup.inputSelector}`));
  const buttonElement = formElement.querySelector(`${formSetup.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formSetup);
      toggleButtonState(inputList, buttonElement, formSetup);
    });
  });
};

// Включает валидацию для форм на странице
function enableValidation(formSetup) {
  const formList = Array.from(document.querySelectorAll(`${formSetup.formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formSetup);
  })
}

// Переключает кнопку сохраненения в нужное состояние, в зависимости от того, есть ли в форме поля ввода с невалидными значениями
function toggleButtonState(inputList, buttonElement, formSetup) {
  if(!hasInvalidInput(inputList)) {
    buttonElement.classList.remove(`${formSetup.inactiveButtonClass}`);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(`${formSetup.inactiveButtonClass}`);
    buttonElement.disabled = true;
  }
}

// Вызов функции включения валидации форм
enableValidation(formSetup);
