const {PublicEndpoint} = require("../../framework/PublicEndpoint");

module.exports.GetLocationsEndpoints = class GetLocationEndpoints extends PublicEndpoint {

    constructor() {
        super("get", "/api/v1/locations");

    }

    onRequest(request, response) {
        response.status(200).json({
            success: true, data: {
                locations: Server.locationService.getMappedLocations(),
                teams: Server.teamService.teams
            }
        });
    }

}