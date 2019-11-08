const {Coordinate} = require("./Coordinate");
module.exports.WebGPS = class WebGPS {

    constructor() {
        this._trackers = [];
    }

    trackLocation(data, lat, long) {
        this._trackers.push({
            data: data,
            coordinates: new Coordinate(lat, long)
        });
    }

    stop() {
        navigator.geolocation.clearWatch(this.watcher);
    }

    updateFrom(lat, long) {
        let trackingDistances = [];

        this._trackers.forEach((tracker) => {
            let distance = tracker.coordinates.distanceInMeters(new Coordinate(lat, long));
            trackingDistances.push({
                meters: distance,
                tracker: tracker.data
            });
        });

        return trackingDistances;
    }

};