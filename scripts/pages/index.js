import Photographer from "../models/Photographer.js";
import PhotographerCard from "../templates/PhotographerCard.js";

async function getPhotographers() {
  const response = await fetch("../data/photographers.json");
  try {
    const data = await response.json();
    return data.photographers.map(
      (photographer) => new Photographer(photographer)
    );
  } catch (error) {
    console.error(error);
  }
}

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const photographerCard = new PhotographerCard(photographer);
    photographerCard.render();
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
