const {RestService} = require("./modules/rest/RestService");
const {LocationService} = require("./modules/locations/LocationModule");
class ServerClass {

    constructor() {

    }

    boot() {
        this.restService = new RestService();
        this.locationService = new LocationService();
        this.teamService = new TeamService();

        this.restService.boot();
        this.locationService.boot();
        this.teamService.boot();
    }

}

global.log = function(message) {
    console.log(message);
};

const fs = require("fs");
const {TeamService} = require("./modules/teams/TeamService");

global.config = {};
global.config.locations = JSON.parse(fs.readFileSync("../config/locations.json"));
global.config.config = JSON.parse(fs.readFileSync("../config/config.json"));

global.Server = new ServerClass();
Server.boot();
