export default class Video {
    constructor(data) {
        this._id = data.id;
        this._photographer_id = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._video = data.video;
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

    get video() {
    return this._video;
    }
}