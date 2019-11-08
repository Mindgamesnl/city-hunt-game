const uuidv4 = require('uuid/v4');
const {Team} = require("./objects/Team");

module.exports.TeamService = class TeamService {

    constructor() {
        this.colors = ['red', 'green', 'blue', 'yellow', 'black', 'orange', 'aqua', 'PaleVioletRed', 'MediumVioletRed', 'Crimson', 'DimGrey', 'Tan', 'Salmon'];
        this.teams = {};
    }

    registerTeam(name) {
        const id = uuidv4();
        const color = this._randomColor();
        this._removeColor(color);

        this.teams[id] = new Team(id, name, color);
    }

    _removeColor(color) {
        const index = this.colors.indexOf(5);
        if (index > -1) {
            this.colors.splice(index, 1);
        }
    }

    _randomColor() {
        return this.colors[Math.floor(Math.random()*this.colors.length)];
    }

    boot() {

        // register test teams
        this.registerTeam('Welivesum');
        this.registerTeam('Amsterdam');
        log(this.teams)
    }

    reCalculateScores() {
        const locations = Server.locationService.getMappedLocations();;

        for (let teamId in this.teams) {
            if (this.teams.hasOwnProperty(teamId)) {
                let score = 0;

                for (const location of locations) {
                    if (location.owningTeam === teamId) score += location.worth;
                }

                this.teams[teamId].score = score;
            }
        }

        console.log(this.teams)
    }
}

