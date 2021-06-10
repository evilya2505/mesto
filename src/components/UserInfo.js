// Класс, отвечающий за управление отображением информации о пользователе на странице
// Принимает в конструктор объект с селекторами элемента имени пользователя и элемента информации о себе
export default class UserInfo {
  constructor({ userNameSelector, occupationSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._occupation = document.querySelector(occupationSelector);
    this._form = document.forms.changeInfo;
    this._inputName = this._form.elements.name;
    this._inputOccupation = this._form.elements.occupation;
  }

  // Метод, возвращающий объект с данными пользователя
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      occupation: this._occupation.textContent
    }

    return userData;
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, occupation }) {
    this._userName.textContent = name;
    this._occupation.textContent = occupation;
  }
}
