// Класс, отвечающий за отрисовку элементов на странице
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // ф-ция, отвечающая за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // контейнер, в который нужно добавлять созданные элементы
  }

  // Метод, принимающий DOM-элемент и добавляющий его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems(items) {
    if (items) {
      items.forEach(item => {
        this._renderer({ placeName: item.name, ...item });
      });
    }
  }
}
