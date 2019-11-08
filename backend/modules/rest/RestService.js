const {HandshakeEndpoint} = require("./endpoints/team/Handshake");
const {CreateTeamEndpoint} = require("./endpoints/team/CreateTeamEndpoint");
const {SetLocationEndpoint} = require("./endpoints/team/SetLocationEndpoint");
const {GetLocationsEndpoints} = require("./endpoints/static/GetLocationsEndpoints");
const fs = require("fs");

module.exports.RestService = class RestService {

    constructor() {

        // setup SSL
        this.app = require('express')();

        const bodyParser = require('body-parser');
        const cors = require('cors');

        this.app.use( bodyParser.json() );
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));

        let https = require('https');

        let options = {
            key: fs.readFileSync(config.config.cert.key),
            cert: fs.readFileSync(config.config.cert.cert)
        };

        this.http = https.createServer(options, this.app);

        this.http.listen(config.config.port);

        this.endpoints = 0;
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
