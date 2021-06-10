import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Перезаписывает родительский метод
  // Вставляет в попап картинку и атрибут src изображения и подпись к картинке
  open(link, placeName) {
    const popupPhotoImage = this._popupElement.querySelector('.popup-photo__image');
    const popupPhotoImageName = this._popupElement.querySelector('.popup-photo__title');

    popupPhotoImage.src = link;
    popupPhotoImageName.textContent = placeName;
    popupPhotoImageName.alt = `изображение ${placeName}`;
    super.open();
  }
}
