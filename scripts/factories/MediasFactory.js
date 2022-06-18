import Media from "../models/Media.js";
import Video from "../models/Video.js";

export default class MediasFactory {
    constructor(data) {
        if(data.video) {
            return new Video(data)
           
        }
        else {
            return new Media(data)
        }
    }
}