// Класс, отвечающий за отрисовку элементов на странице
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer; // ф-ция, отвечающая за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // контейнер, в который нужно добавлять созданные элементы
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
