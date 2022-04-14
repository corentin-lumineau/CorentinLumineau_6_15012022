import Media from "../models/Media.js";
import MediaCard from "../templates/MediaCard.js";
import VideoCard from "../templates/VideoCard.js"
import Photographer from "../models/Photographer.js";
import PhotographHeader from "../templates/PhotographHeader.js";
import createBlocLikes from "../templates/blocLikes.js";
import MediasFactory from "../factories/MediasFactory.js";

async function getPhotographer() {
  //get the selected photographer
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPhotographer = urlParams.get("id");

  const response = await fetch("./data/photographers.json");

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
  //Bloc header initialize with the infos of the photographer
  const photographer = await getPhotographer();
  displayPhotographer(photographer);
}

async function initBlocLikes() {
  //Bloc likes initialization with likes from all medias
  const photographer = await getPhotographer();
  const medias = await getMedias();
  const price = photographer[0].price;

  let likes = 0;
  medias.forEach((media) => {
    likes += media.likes;
  });

  createBlocLikes(price, likes);
}
 
initBlocLikes();

async function getMedias() {
  //get all medias of the selected photographer
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPhotographer = urlParams.get("id");
  const request = await fetch("./data/photographers.json");

  try {
    const response = await request.json();
    const filterResponse = response.media.filter(
      (media) => media.photographerId == idPhotographer
    );

    return filterResponse.map((media) => new MediasFactory(media));
  } catch (error) {
    console.log(error);
  }
}

function createCardMedia(medias) {
  medias.forEach((media) => {
    if(media.constructor.name ==="Media") {
      const mediaCard = new MediaCard(media);
      mediaCard.render();
    }
    else {
      const mediaCard = new VideoCard(media);
      mediaCard.render();
    }
  });
}



function cleanMediasContainer() {
  const mainContainer = document.querySelector(".photograph-medias-container");
  const container = document.querySelector(".medias-container");
  container.remove();
  const newContainer = document.createElement("div");
  newContainer.classList.add("medias-container");
  mainContainer.appendChild(newContainer);
  //Utiliser innerHTML pour les nouvelles cards
}

const handleFilter = (event) => {
  //listener on each filter-name to trigger filters and launch them
  //Handling keyboard utilisation to navigate
  const allElements = document.querySelectorAll("li");
  const lastElements = dropdown.querySelectorAll("li:nth-last-child(-n + 2");

  allElements.forEach((item) => {
    item.addEventListener("click", (event) => {
      changeContent(event);
      launchFilter(event);
    });

    item.addEventListener("keypress", (event) => {
      const key = event.key;
      if (key !== "Enter") return;
      changeContent(event);
      launchFilter(event);
      chevron.focus();
    });
  });

  const listbox = document.querySelector('[role="listbox"]');
  const option = listbox.firstElementChild;

  option.focus();

  listbox.addEventListener("keydown", (event) => {
    const { key } = event;
    if (key !== "ArrowDown" && key !== "ArrowUp") return;
    event.preventDefault();

    const option = event.target;

    let selectedOption;
    if (key === "ArrowDown") selectedOption = option.nextElementSibling;
    if (key === "ArrowUp") selectedOption = option.previousElementSibling;

    if (selectedOption) {
      selectedOption.focus();
      allElements.forEach((element) => {
        element.setAttribute("tabindex", -1);
      });
      selectedOption.setAttribute("tabindex", 0);
    }
  });

  showLastElements(lastElements);

  event.stopPropagation();
};

function showLastElements(node) {
  const chevron = dropdown.querySelector(".fas");
  node.forEach((item) => {
    item.style.display = "flex";
    chevron.setAttribute("style", "transform: rotate(180deg)");
  });
}

function hideLastElements(node) {
  node.forEach((item) => {
    item.style.display = "none";
  });
}

function changeContent(event) {
  //Display the selected filter in the dropdown
  const selectedElement = event.currentTarget;
  selectedElement.classList.remove("border-ul");
  dropdown.prepend(selectedElement);
  dropdown.firstChild.appendChild(chevron);

  const secondELement = document.querySelector("li:nth-child(even)");
  secondELement.classList.add("border-ul");

  const lastElements = dropdown.querySelectorAll("li:nth-last-child(-n + 2");
  hideLastElements(lastElements);
}

async function launchFilter(event) {
  let filterName = event.currentTarget.textContent.trim();
  if (filterName == "Date") {
    filterByDate(medias);
  } else if (filterName == "Titre") {
    filterByTitle(medias);
  } else {
    filterByPopularity(medias);
  }
}

const filterByPopularity = (medias) => {
  medias.sort((a, b) => {
    return b.likes - a.likes;
  });
  cleanMediasContainer();
  createCardMedia(medias);
};

const filterByDate = (medias) => {
  medias.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  cleanMediasContainer();
  createCardMedia(medias);
};

const filterByTitle = (medias) => {
  medias.sort((a, b) => {
    let firstLetterA = a.title.split("")[0];
    let firstLetterB = b.title.split("")[0];
    if (firstLetterA < firstLetterB) {
      return -1;
    } else if (firstLetterA > firstLetterB) {
      return 1;
    } else {
      return 0;
    }
  });
  cleanMediasContainer();
  createCardMedia(medias);
};

function navigateMedia(event, array, type) {
  const slider = event.currentTarget.parentNode;
  const currentImageId = slider.querySelector("img").id;
  const currentImage = (element) => element.id == currentImageId;
  const currentImageIndex = array.findIndex(currentImage);
  const title = document.querySelector(".image-title");

  if (type == "previous") {
    const previousImage = array[currentImageIndex - 1];
    slider
      .querySelector("img")
      .setAttribute("src", `./assets/photographers/${previousImage.image}`);
    slider.querySelector("img").setAttribute("id", previousImage.id);
   
    title.textContent = previousImage.title;

    title.textContent = previousImage.title;
  } else {
    const nextImage = array[currentImageIndex + 1];
    slider
      .querySelector("img")
      .setAttribute("src", `./assets/photographers/${nextImage.image}`)
      slider.querySelector("img").setAttribute("id", nextImage.id);
      slider.querySelector("img").setAttribute("alt", nextImage.title);
      

    title.textContent = nextImage.title;
  }
}

export function createModale(img, title, id) {
  const main = document.querySelector("main");
  main.setAttribute("aria-hidden", "true");
  const modale = document.createElement("dialog");
  modale.setAttribute("aria-hidden", "false");
  modale.classList.add("view-media");
  modale.setAttribute("open", true);
  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider-container");

  const rightArrow = document.createElement("i");
  rightArrow.classList.add("fas");
  rightArrow.classList.add("fa-chevron-right");
  rightArrow.setAttribute("role", "button");
  rightArrow.setAttribute("tabindex", 2);

  const leftArrow = document.createElement("i");
  leftArrow.classList.add("fas");
  leftArrow.classList.add("fa-chevron-left");
  leftArrow.setAttribute("role", "button");
  leftArrow.setAttribute("tabindex", 1);

  const contentContainer = document.createElement("a");
  contentContainer.setAttribute("tabindex", 0);
  contentContainer.setAttribute("aria-label", `${title}`)
  contentContainer.classList.add("content-container");

  const content = document.createElement("img");
  content.setAttribute("src", img);
  content.setAttribute("id", id);
  content.setAttribute("alt", title);

  content.classList.add("view-media__show");

  const imageTitle = document.createElement("p");
  imageTitle.classList.add("image-title");
  imageTitle.textContent = title;

  const closeButton = document.createElement("button");
  
  closeButton.setAttribute("tabindex", 0);

  closeButton.classList.add('close-modale-show');
  closeButton.setAttribute('role', "button");
  closeButton.setAttribute('aria-label', "Fermer image");
  
  closeButton.innerHTML = "<i class='fas fa-times'></i>";
  closeButton.focus();
  closeButton.addEventListener("click", () => {
    modale.remove();
  });
  closeButton.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key !== "Enter") return;
    modale.remove();
  });

  main.appendChild(modale);
  modale.appendChild(sliderContainer);
  modale.appendChild(closeButton);
  sliderContainer.appendChild(leftArrow);
  sliderContainer.appendChild(contentContainer);
  sliderContainer.appendChild(rightArrow);
  contentContainer.appendChild(content);
  contentContainer.appendChild(imageTitle);

  const array = medias;

  rightArrow.addEventListener("click", (event) => {
    navigateMedia(event, array, "next");
  });

  leftArrow.addEventListener("click", (event) => {
    navigateMedia(event, array, "previous");
  });

  sliderContainer.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
      navigateMedia(event, array, "previous");
    } else if (event.key == "ArrowRight") {
      navigateMedia(event, array, "next");
    }
  });

  contentContainer.focus();
}

const dropdown = document.querySelector("ul");
const chevron = dropdown.querySelector(".fas");

let medias = await getMedias();

chevron.addEventListener("click", handleFilter);
chevron.addEventListener("keypress", (event) => {
  const key = event.key;
  if (key !== "Enter") return;

  handleFilter(event);
});

initHeader();
createCardMedia(medias);

//Contact modale function

export const createModaleContact = (name) => {
  const main = document.querySelector("main");
  const overlay = document.querySelector(".overlay");
  const modaleContact = document.getElementById("contact_modal");
  const header = modaleContact.querySelector("header");
  const photographerName = name;
  header.innerHTML = `<h1>Contactez-moi ${photographerName}</h1>
  <img src="assets/icons/close.svg" class="close-modale-show" role="button" aria-label="Fermer formulaire de contact" tabindex="0">`;
  const buttonClose = modaleContact.querySelector(".close-modale-show");

  overlay.style.display = "block";
  modaleContact.style.display = "block";
  modaleContact.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "true");
  buttonClose.focus();
  buttonClose.addEventListener("click", () => {
    closeModaleContact(overlay, modaleContact, main);
  });

  buttonClose.addEventListener("keypress", (event) => {
    const key = event.key;
    if (key !== "Enter") return;
    closeModaleContact(overlay, modaleContact, main);
  });
};

export function closeModaleContact(overlay, modaleContact, main) {
  overlay.style.display = "none";
  modaleContact.style.display = "none";
  modaleContact.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "false");
}
