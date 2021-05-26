export const formSetup = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}

// ----- Класс, настраивающий валидацию полей формы -----
export class FormValidator {
  constructor(formSetup, formElement) {
    this._formSelector = formSetup.formSelector;
    this._inputSelector = formSetup.inputSelector;
    this._submitButtonSelector = formSetup.submitButtonSelector;
    this._inactiveButtonClass = formSetup.inactiveButtonClass;
    this._inputErrorClass = formSetup.inputErrorClass;
    this._errorClass = formSetup.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
  }

  // Отображение ошибки при невалидном значении в поле ввода
 _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.classList.add(`${this._errorClass}`);
    errorElement.textContent = errorMessage;
  }

  // Скрывает ошибку при валидном значении в поле ввода
 _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`);

    inputElement.classList.remove(`${formSetup.inputErrorClass}`);
    errorElement.classList.remove(`${formSetup.errorClass}`);
    errorElement.textContent = '';
  }

  // Проверяет валидность значений в поле ввода
 _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  // Проверяет есть ли поля с невалидными значениями в форме
 _hasInvalidInput() {
    return this._inputList.some((formElement) => {
      return !formElement.validity.valid;
      });
  }

  // Переключает кнопку сохраненения в нужное состояние, в зависимости от того, есть ли в форме поля ввода с невалидными значениями
  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(`${formSetup.submitButtonSelector}`);

    if(!this._hasInvalidInput()) {
      buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(`${this._inactiveButtonClass}`);
      buttonElement.disabled = true;
    }
  }

  // Устанавливает обработчики событий на элементы формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  /* Устанавливает правильное состояние для кнопки сохранения и ошибок (
    Удаляет все ошибки, которые появились, если пользователь ввел невалидные данные и закрыл попап;
    Устанавливает нужное состояние кнопке сохранения) */
  setFormState() {
    this._inputList.forEach((inputItem) => {
      this._hideError(inputItem);
    });


    /* Идея была в том, чтобы при открытии попапа с формой кнопка принимала значение в зависимости от того, валидные ли данные в форме, если просто отключить кнопку, то, например, в форме с редактированием информации тоже будет отключенная кнопка, хотя по идее там изначально введены валидные данные*/
    this._toggleButtonState();
  }

  // Включает валидацию формы
  enableValidation() {
    this._setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}
