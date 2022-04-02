import { createModale } from "../pages/photographer.js";
import { handleTotalLikes } from "./blocLikes.js";

export default class MediaCard {
  constructor(data) {
    this._data = data;
  }

  displayBloc(parent, bloc) {
    parent.appendChild(bloc);
  }

  render() {
    const mediasContainer = document.querySelector(".medias-container");
    const title = this._data.title;
    const { _image, _video } = this._data;
    let { _likes } = this._data;
    const article = document.createElement("article");
    article.classList.add("media-article");

    const link = document.createElement("a");
    if (_video) {
      const video = document.createElement("video");
      video.setAttribute("src", `./assets/videos/${_video}`);
      video.setAttribute("type", "video/mp4");
      video.setAttribute("controls", true);
      link.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", `./assets/photographers/${_image}`);
      img.setAttribute("tabindex", "0");
      img.setAttribute("alt", title);
      img.addEventListener("click", () => {});
      link.appendChild(img);
      img.addEventListener("click", () => {
        createModale(img.src, title, this._data.id);
      });
      img.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key !== "Enter") return;
        createModale(img.src, title, this._data.id);
      });
    }

    const details = document.createElement("div");
    details.classList.add("media-details");
    const titleBloc = document.createElement("p");
    titleBloc.textContent = title;
    const blocLikes = document.createElement("div");
    blocLikes.classList.add("media-details__likes");
    let likes = document.createElement("p");
    likes.textContent = _likes;

    blocLikes.addEventListener("click", () => {
      parseInt(likes.textContent++);
      handleTotalLikes();
    });

    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart");

    mediasContainer.appendChild(article);
    article.appendChild(link);
    article.appendChild(details);
    details.appendChild(titleBloc);
    details.appendChild(blocLikes);
    blocLikes.appendChild(likes);
    blocLikes.appendChild(heart);
  }
}
