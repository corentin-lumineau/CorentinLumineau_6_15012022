export default class PhotographHeader {
  constructor(data) {
    this._data = data;
  }

  render() {
    const { _portrait, _name, _tagline, _country, _city } = this._data;

    const photographHeader = document.querySelector(".photograph-header");
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper-description");
    const description = document.createElement("div");
    description.classList.add("photograph-header__description");
    const name = document.createElement("h2");
    name.textContent = _name;

    const localization = document.createElement("p");
    localization.textContent = `${_city}, ${_country}`;
    localization.classList.add("localization");

    const tagline = document.createElement("p");
    tagline.textContent = _tagline;
    tagline.classList.add("tagline");

    const img = document.createElement("img");
    img.setAttribute("src", `/assets/images/${_portrait}`);

    const button = document.querySelector("button");

    /* photographHeader.insertBefore(description, photographHeader.children[0]); */
    photographHeader.appendChild(wrapper);
    photographHeader.appendChild(img);
    wrapper.appendChild(description);
    wrapper.appendChild(button);
    description.appendChild(name);
    description.appendChild(localization);
    description.appendChild(tagline);
  }
}
