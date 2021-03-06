export default class Media {
  constructor(data) {
    this._id = data.id;
    this._photographer_id = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;

  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }

  get image() {
    return this._image;
  }
}
