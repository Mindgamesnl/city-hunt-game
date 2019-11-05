export default class Coordinate {

    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    distanceInMeters(otherCoordinate) {
        return this.distanceInKilometers(otherCoordinate) * 1000;
    }

    distanceInKilometers(otherCoordinate) {
        let R = 6371; // Radius of the earth in km
        let dLat = this._degreesToRadians(otherCoordinate.latitude-this.latitude);  // deg2rad below
        let dLon = this._degreesToRadians(otherCoordinate.longitude-this.longitude);
        let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this._degreesToRadians(this.latitude)) * Math.cos(this._degreesToRadians(otherCoordinate.latitude)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return  R * c; // Distance in km
    }

    _degreesToRadians(deg) {
        return deg * (Math.PI/180)
    }

}