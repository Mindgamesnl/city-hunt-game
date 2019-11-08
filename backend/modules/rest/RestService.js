const {HandshakeEndpoint} = require("./endpoints/team/Handshake");
const {CreateTeamEndpoint} = require("./endpoints/team/CreateTeamEndpoint");
const {SetLocationEndpoint} = require("./endpoints/team/SetLocationEndpoint");
const {GetLocationsEndpoints} = require("./endpoints/static/GetLocationsEndpoints");
const fs = require("fs");

module.exports.RestService = class RestService {

    constructor() {

        // setup SSL
        let app = require('express')();
        let https = require('https');

        let options = {
            key: fs.readFileSync(config.config.cert.key),
            cert: fs.readFileSync(config.config.cert.cert)
        };

        this.http = https.createServer(options, app);

        this.http.listen(config.config.port);

        this.endpoints = 0;

        const bodyParser = require('body-parser');
        const cors = require('cors');

        this.http.use( bodyParser.json() );
        this.http.use(cors());
        this.http.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));
    }

    boot() {
        new GetLocationsEndpoints();
        new SetLocationEndpoint();
        new CreateTeamEndpoint();
        new HandshakeEndpoint();

        log("Finished routes. total " + this.endpoints)
    }

    registerEndpoint(method, route, handler) {
        this.http[method](route, handler);
    }

};
