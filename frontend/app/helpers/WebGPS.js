import Coordinate from "./Coordinate";

export default class WebGPS {

    constructor(onUpdate, onError) {
        this.onUpdate = onUpdate;
        this.onError = onError;
        this._trackers = [];

        navigator.geolocation.watchPosition((update) => {
            this._locationUpdate(update.coords.latitude, update.coords.longitude);
        }, this.onError, {enableHighAccuracy: true});
    }

    trackLocation(data, lat, long) {
        this._trackers.push({
            data: data,
            coordinates: new Coordinate(lat, long)
        });
    }

    _locationUpdate(lat, long) {
        let currentLocation = new Coordinate(lat, long);
        let trackingDistances = [];

        this._trackers.forEach((tracker) => {
            let distance = tracker.coordinates.distanceInMeters(currentLocation);
            trackingDistances.push({
                meters: distance,
                tracker: tracker.data
            });
        });

        this.onUpdate({
            trackers: trackingDistances,
            location: new Coordinate(lat, long)
        });
    }

}