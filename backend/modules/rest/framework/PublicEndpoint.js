module.exports.PublicEndpoint = class PublicEndpoint {

    constructor(method, route) {
        Server.restService.registerEndpoint(method, route, (req, res) => {
            this.onRequest(req, res);
        });
        Server.restService.endpoints++;
    }

};
