export default class PhotographerCard {
  constructor(data) {
    this._data = data;
  }

  render() {
    const { _portrait, _name, _tagline, _price, _country, _city, _id } =
      this._data;
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    const article = document.createElement("article");
    article.classList.add("photograph-article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${_id}`);

    const img = document.createElement("img");
    img.setAttribute("src", `/assets/images/${_portrait}`);
    img.setAttribute("alt", "");
    const h2 = document.createElement("h2");
    h2.textContent = _name;

    /*     [_country, _tagline, _price].forEach((element) => {
      console.log(Object.keys({ element }));
      const bloc = document.createElement("p");
      bloc.textContent = element;
    }); */

    const localization = document.createElement("p");
    localization.textContent = `${_city}, ${_country}`;
    localization.classList.add("country");

    const tagline = document.createElement("p");
    tagline.textContent = _tagline;
    tagline.classList.add("tagline");

    const price = document.createElement("p");
    price.textContent = `${_price}€/jour`;
    price.classList.add("price");

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(localization);
    article.appendChild(tagline);
    article.appendChild(price);

    photographersSection.appendChild(article);
  }
}
