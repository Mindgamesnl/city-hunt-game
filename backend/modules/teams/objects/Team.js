module.exports.Team = class Team {

    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.score = 0;
        this.lat = 0;
        this.lon = 0;
    }
    
};