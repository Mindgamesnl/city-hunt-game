const {PublicEndpoint} = require("../../framework/PublicEndpoint");

module.exports.CreateTeamEndpoint = class CreateTeamEndpoint extends PublicEndpoint {

    constructor() {
        super("get", "/api/v1/team/create/:password/:name");
    }

    onRequest(request, response) {
        if (config.config.password === request.params.password) {
            response.status(200).json({
                success: true, data: Server.teamService.registerTeam(request.params.name)
            });
        } else {
            response.status(200).json({
                success: false, data: {}
            });
        }
    }

};