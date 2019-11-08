module.exports.MappedLocation = class MappedLocation {

    constructor(lat,lon, name, worth) {
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        this.worth = worth;
        this.owningTeam = null;

        log("regestering " + name + " for " + worth + " points")
    }

}