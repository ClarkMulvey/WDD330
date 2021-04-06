export class Hike {
    constructor(id, name, distance, difficulty, description, directions, imgSrc="falls.jpg", imgAlt="Image of Bechler Falls", comments) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.difficulty = difficulty;
        this.description = description;
        this.directions = directions;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.comments = [];
    }


}