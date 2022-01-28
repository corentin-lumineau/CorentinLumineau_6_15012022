export default class MediaCard {
  constructor(data) {
    this._data = data;
  }

  render() {
    const mediasContainer = document.querySelector(".medias-container");

    const { _title, _likes, _image, _video } = this._data;
    const article = document.createElement("article");
    article.classList.add("media-article");

    const link = document.createElement("a");
    if (_video) {
      const video = document.createElement("video");
      video.setAttribute("src", `/assets/videos/${_video}`);
      video.setAttribute("type", "video/mp4");
      link.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", `/assets/photographers/${_image}`);
      link.appendChild(img);
    }

    const details = document.createElement("div");
    details.classList.add("media-details");
    const title = document.createElement("p");
    title.textContent = _title;
    const blocLikes = document.createElement("div");
    blocLikes.classList.add("media-details__likes");
    const likes = document.createElement("p");
    likes.textContent = _likes;
    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart");

    mediasContainer.appendChild(article);

    article.appendChild(link);

    article.appendChild(details);
    details.appendChild(title);
    details.appendChild(blocLikes);
    blocLikes.appendChild(likes);
    blocLikes.appendChild(heart);
  }
}
