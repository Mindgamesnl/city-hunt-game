const uuidv4 = require('uuid/v4');
const {Team} = require("./objects/Team");

module.exports.TeamService = class TeamService {

    constructor() {
        this.colors = ['red', 'green', 'blue', 'yellow', 'black', 'orange', 'aqua', 'PaleVioletRed', 'MediumVioletRed', 'Crimson', 'DimGrey', 'Tan', 'Salmon'];
        this.teams = {};
        this.accesTokens = {};
    }

    registerTeam(name) {
        const id = uuidv4();
        const color = this._randomColor();
        const accessToken = this.makeid(6);
        this._removeColor(color);

        this.accesTokens[accessToken] = id;
        this.teams[id] = new Team(id, name, color);

        return accessToken;
    }

    getTeamByAccessToken(token){
        if (this.accesTokens[token] == null) return null;
        return this.teams[this.accesTokens[token]];
    }

    _removeColor(color) {
        const index = this.colors.indexOf(5);
        if (index > -1) {
            this.colors.splice(index, 1);
        }
    }

    makeid(length) {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    _randomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    boot() {

        // register test teams
    }

    reCalculateScores() {
        const locations = Server.locationService.getMappedLocations();
        ;

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

