const {Coordinate} = require("../../../locations/tools/Coordinate");
const {PublicEndpoint} = require("../../framework/PublicEndpoint");

module.exports.LogLocationEndpoint = class LogLocationEndpoint extends PublicEndpoint {

    constructor() {
        super("post", "/api/v1/team/setloc");

        this.requiredFields = [
            "lat",
            "lon",
            "token"
        ];
    }

    onRequest(request, response) {
        for (let requiredFieldsKey in this.requiredFields) {
            if (request.body[this.requiredFields[requiredFieldsKey]] == null) {
                this.dieError(response, "Value '" + this.requiredFields[requiredFieldsKey] + "' can not be empty.");
                return;
            }
        }

        const team = Server.teamService.getTeamByAccessToken(request.body.token);
        if (team == null) return null;

        team.lat = request.body.lat;
        team.lon = request.body.lon;

        response.status(200).json({
            success: true, data: {}
        });
    }

    dieError(res, message) {
        res.status(200).json({
            success: false, errors: [
                message
            ]
        });
    }

};