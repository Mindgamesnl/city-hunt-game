const {PublicEndpoint} = require("../../framework/PublicEndpoint");

module.exports.CreateTeamEndpoint = class CreateTeamEndpoint extends PublicEndpoint {

    constructor() {
        super("get", "/api/v1/team/create/:password/:name");
    }

    onRequest(request, response) {
        if (config.config.password === request.params.password) {
            response.send(Server.teamService.registerTeam(request.params.name));
        } else {
            response.send("invalid pass");
        }
    }

};