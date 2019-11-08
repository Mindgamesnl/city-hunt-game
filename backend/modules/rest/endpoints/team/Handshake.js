const {PublicEndpoint} = require("../../framework/PublicEndpoint");

module.exports.HandshakeEndpoint = class HandshakeEndpoint extends PublicEndpoint {

    constructor() {
        super("post", "/api/v1/team");

        this.requiredFields = [
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

        const found = Server.teamService.getTeamByAccessToken(request.body.token);

        if (found) {
            response.status(200).json({
                success: true, data: found
            });
        } else {
            response.status(200).json({
                success: false, data: {found:false}
            });
        }
    }

    dieError(res, message) {
        res.status(200).json({
            success: false, errors: [
                message
            ]
        });
    }

};