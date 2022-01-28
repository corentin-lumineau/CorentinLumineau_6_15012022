export default class MediaCard {
  constructor(data) {
    this._data = data;
  }

  render() {
    const mediasContainer = document.querySelector(".medias-container");
    const { _title, _like, _image } = this._data;
    const article = document.createElement("article");
    article.textContent = _title;

    mediasContainer.appendChild(article);
  }
}
