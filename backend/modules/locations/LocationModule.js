const {MappedLocation} = require("./objects/Location");
const {Coordinate} = require("./tools/Coordinate");
const {WebGPS} = require("./tools/WebGPS");

module.exports.LocationService = class LocationService {

    constructor() {
        this._locations = {};
        this.gps = new WebGPS();
    }

    getMappedLocations() {
        let mappedLocations = [];

        for (let locationId in this._locations) {
            if (this._locations.hasOwnProperty(locationId)) mappedLocations.push(this._locations[locationId]);
        }

        return mappedLocations;
    }

    getLocationAtCoordinate(cord, teamID) {
        const targets = this.gps.updateFrom(cord.latitude, cord.longitude);
        let inRange = null;

        targets.forEach(tracker => {
            if (tracker.meters <= 30) inRange = tracker.tracker;
        });

        // if the team id is the same as this one, then don't do anything since we already have it
        if (this._locations[inRange].owningTeam === teamID) {
            return null;
        }

        // re-assign owning team
        this._locations[inRange].owningTeam = teamID;

        // re-evaluate scores
        Server.teamService.reCalculateScores();

        if (inRange) {
            return this._locations[inRange];
        } else {
            return null;
        }
    }

    boot() {
        const start = new Coordinate(config.config.start.lat, config.config.start.lon);

        config.locations.forEach(location => {
            const target = new Coordinate(location.lat, location.lon);
            const worth = Math.round(target.distanceInMeters(start) / 10);

            location.worth = worth;
            this._locations[location.name] = new MappedLocation(location.lat, location.lon, location.name, worth);
            this.gps.trackLocation(location.name, location.lat, location.lon);
        });
    }
};
