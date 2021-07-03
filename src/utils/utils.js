// Меняет текст кнопки, пока данные загружаются, когда данные загружены, возвращает изначальный текст
export default function renderLoading({ buttonElement, isLoading, initialText }) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = initialText;
  }
}
