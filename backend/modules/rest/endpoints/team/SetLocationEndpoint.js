const {Coordinate} = require("../../../locations/tools/Coordinate");
const {PublicEndpoint} = require("../../framework/PublicEndpoint");

module.exports.SetLocationEndpoint = class SetLocationEndpoint extends PublicEndpoint {

    constructor() {
        super("post", "/api/v1/team/pushloc");

        this.requiredFields = [
            "lat",
            "lon",
            "teamId"
        ];
    }

    onRequest(request, response) {
        for (let requiredFieldsKey in this.requiredFields) {
            if (request.body[this.requiredFields[requiredFieldsKey]] == null) {
                this.dieError(response, "Value '" + this.requiredFields[requiredFieldsKey] + "' can not be empty.");
                return;
            }
        }

        const found = Server.locationService.getLocationAtCoordinate(new Coordinate(request.body.lat, request.body.lon), request.body.teamId);

        if (found) {
            response.status(200).json({
                success: true, data: {
                    found: true,
                    name: found.name,
                    worth: found.worth
                }
            });
        } else {
            response.status(200).json({
                success: true, data: {found:false}
            });
        }
    }

};