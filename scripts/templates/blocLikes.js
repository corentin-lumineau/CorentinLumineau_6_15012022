export default function createBlocLikes(price, likes) {
  const main = document.querySelector("main");
  const container = document.createElement("div");
  container.classList.add("bloc-likes");
  const containerLikes = document.createElement("div");
  containerLikes.classList.add("bloc-likes__likes");
  const containerPrice = document.createElement("div");
  containerPrice.classList.add("bloc-likes__price");
  const heart = document.createElement("i");
  heart.classList.add("fas", "fa-heart");
  let numberOfLikes = document.createElement("p");
  numberOfLikes.textContent = likes;

  containerPrice.textContent = `${price}€ / jour`;

  main.appendChild(container);
  container.appendChild(containerLikes);
  container.appendChild(containerPrice);
  containerLikes.appendChild(numberOfLikes);
  containerLikes.appendChild(heart);
}

export function handleTotalLikes() {
  //Increment the total number of likes
  const containerBlocLikes = document.querySelector(".bloc-likes__likes");
  const numberOfLikes = containerBlocLikes.querySelector("p");
  parseInt(numberOfLikes.textContent++);
}
