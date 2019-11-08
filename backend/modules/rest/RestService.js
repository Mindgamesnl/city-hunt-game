const {HandshakeEndpoint} = require("./endpoints/team/Handshake");
const {CreateTeamEndpoint} = require("./endpoints/team/CreateTeamEndpoint");
const {SetLocationEndpoint} = require("./endpoints/team/SetLocationEndpoint");
const {GetLocationsEndpoints} = require("./endpoints/static/GetLocationsEndpoints");
module.exports.RestService = class RestService {

    constructor() {

        this.endpoints = 0;

        const bodyParser = require('body-parser');
        const cors = require('cors');
        const express = require('express');
        this.app = express();

        this.app.use( bodyParser.json() );
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));

        this.app.listen(80, () => {
            // started
        });
    }

    boot() {
        new GetLocationsEndpoints();
        new SetLocationEndpoint();
        new CreateTeamEndpoint();
        new HandshakeEndpoint();

        log("Finished routes. total " + this.endpoints)
    }

    registerEndpoint(method, route, handler) {
        this.app[method](route, handler);
    }

};
