// Класс, отвечающий за управление отображением информации о пользователе на странице
// Принимает в конструктор объект с селекторами элемента имени пользователя и элемента информации о себе
export default class UserInfo {
  constructor({ userNameSelector, descriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._form = document.forms.changeInfo;
    this._inputName = this._form.elements.name;
    this._inputOccupation = this._form.elements.occupation;
  }

  // Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    this._inputName.value = this._userName.textContent;
    this._inputOccupation.value = this._description.textContent;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, occupation }) {
    this._userName.textContent = name;
    this._description.textContent = occupation;
  }
}
