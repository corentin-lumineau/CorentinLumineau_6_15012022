import Media from "../models/Media.js";
import MediaCard from "../templates/MediaCard.js";
import Photographer from "../models/Photographer.js";
import PhotographHeader from "../templates/PhotographHeader.js";

async function getPhotographer() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPhotographer = urlParams.get("id");

  const response = await fetch("../data/photographers.json");

  try {
    const data = await response.json();
    const photographers = data.photographers;

    return photographers
      .filter((photographer) => photographer.id == idPhotographer)
      .map((data) => new Photographer(data));
  } catch (error) {
    console.log(error);
  }
}

async function displayPhotographer(data) {
  data.forEach((data) => {
    const photographHeader = new PhotographHeader(data);
    photographHeader.render();
  });
}

async function initHeader() {
  const photographer = await getPhotographer();
  displayPhotographer(photographer);
}

async function getMedias() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPhotographer = urlParams.get("id");
  const request = await fetch("../data/photographers.json");

  try {
    const response = await request.json();
    const filterResponse = response.media.filter(
      (media) => media.photographerId == idPhotographer
    );

    return filterResponse.map((media) => new Media(media));
  } catch (error) {
    console.log(error);
  }
}

async function initMedias() {
  const medias = await getMedias();
  medias.forEach((media) => {
    const mediaCard = new MediaCard(media);
    mediaCard.render();
    console.log(mediaCard);
  });
}

initHeader();
initMedias();
