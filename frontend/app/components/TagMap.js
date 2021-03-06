import React from 'react';
import PropTypes from 'prop-types';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';
import WebGPS from "../helpers/WebGPS";
import * as Swal from "sweetalert2";
import ApiRequest from "../helpers/ApiRequest";

const position = [52.231877, 5.170856];

export default class TagMap extends React.Component {

    state = {
        myLocation: null,
        gps: null,
        currentTarget: null
    };

    static propTypes = {
        locations: PropTypes.array,
        teams: PropTypes.any,
        isAdmin: PropTypes.bool
    };

    static defaultProps = {
        locations: [],
        teams: {},
        isAdmin: false
    };

    componentWillUnmount() {
        if (this.props.isAdmin) return;
        this.state.gps.stop();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAdmin) return;
        let currentTarget = false;
        if (prevProps.locations.length !== this.props.locations.length) {
            if (this.state.gps) {
                this.state.gps.stop();
            }

            let gps = new WebGPS(update => {
                this.setState({
                    myLocation: update.location
                });

                // go over all location updates and look for any in a range of 30 meters
                let inRange = false;

                update.trackers.forEach(tracker => {
                    if (tracker.meters <= 30) inRange = tracker;
                });

                if (inRange && inRange !== currentTarget) {
                    if (!currentTarget && currentTarget.name === inRange.name) this.handleFind();
                } else {
                    // send regular location
                    this.syncLoc();
                }


                currentTarget = inRange;
            });

            this.props.locations.forEach(location => {
                console.log("Tracking " + location.name);
                gps.trackLocation(location.name, location.lat, location.lon);
            });

            this.setState({gps});
        }
    }

    syncLoc() {
        new ApiRequest("/api/v1/team/setloc")
            .post()
            .setContext({
                "lat": this.state.myLocation.latitude,
                "lon": this.state.myLocation.longitude
            })
            .auth()
            .run()
            .then(result => {

            })
            .catch((err) => {
                console.log(err)
            });
    }

    handleFind() {
        new ApiRequest("/api/v1/team/pushloc")
            .post()
            .setContext({
                "lat": this.state.myLocation.latitude,
                "lon": this.state.myLocation.longitude
            })
            .auth()
            .run()
            .then(result => {
                if (result.found) {
                    Swal.fire({
                        animation: false,
                        titleText: result.name + ' geclaimed!',
                        text: '+' + result.worth + ' punten'
                    })
                }
            })
            .catch((err) => {
                console.log("whoops")
                console.error(err)
            });
    }

    render() {
        let markers = [];

        // locations
        this.props.locations.forEach(location => {

            // is it claimed? by who?
            if (location.owningTeam === null) {
                markers.push(
                    <Marker key={location.name} lat={location.lat} lon={location.lon} onClick={() => {
                        Swal.fire({
                            animation: false,
                            title: location.name,
                            footer: 'Nog niet door een team geclaimed'
                        })
                    }}>
                        <MarkerLayout>
                            <h2 style={{bottom: '0', right: '0', color: 'black'}}>&#10687;</h2>
                        </MarkerLayout>
                    </Marker>
                )
            } else {
                const team = this.props.teams[location.owningTeam];
                markers.push(
                    <Marker key={location.name} lat={location.lat} lon={location.lon} onClick={() => {
                        Swal.fire({
                            animation: false,
                            title: location.name,
                            footer: 'Geclaimed door ' + team.name
                        })
                    }}>
                        <MarkerLayout>
                            <h2 style={{top: '50%', left: '50%', color: team.color}}>&#10687;</h2>
                        </MarkerLayout>
                    </Marker>
                )
            }
        });

        // you
        if (this.state.myLocation) {
            markers.push(
                <Marker key={'myloc'} lat={this.state.myLocation.latitude} lon={this.state.myLocation.longitude}
                        onClick={() => {
                            Swal.fire({
                                animation: false,
                                text: "Jij bent hier",
                            })
                        }}>
                    <MarkerLayout>
                        <h1 style={{top: '50%', left: '50%', color: 'black'}}>&#8226;</h1>
                    </MarkerLayout>
                </Marker>
            )
        }

        // others? if you are admin
        if (this.props.isAdmin) {
            if (this.props.teams) {import React from 'react';
import PropTypes from 'prop-types';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';
import WebGPS from "../helpers/WebGPS";
import * as Swal from "sweetalert2";
import ApiRequest from "../helpers/ApiRequest";

const position = [52.231877, 5.170856];

export default class TagMap extends React.Component {

    state = {
        myLocation: null,
        gps: null,
        currentTarget: null
    };

    static propTypes = {
        locations: PropTypes.array,
        teams: PropTypes.any,
        isAdmin: PropTypes.bool
    };

    static defaultProps = {
        locations: [],
        teams: {},
        isAdmin: false
    };

    componentWillUnmount() {
        if (this.props.isAdmin) return;
        this.state.gps.stop();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAdmin) return;
        let currentTarget = false;
        if (prevProps.locations.length !== this.props.locations.length) {
            if (this.state.gps) {
                this.state.gps.stop();
            }

            let gps = new WebGPS(update => {
                this.setState({
                    myLocation: update.location
                });

                // go over all location updates and look for any in a range of 30 meters
                let inRange = false;

                update.trackers.forEach(tracker => {
                    if (tracker.meters <= 30) inRange = tracker;
                });

                if (inRange && inRange !== currentTarget) {
                    if (!currentTarget && currentTarget.name === inRange.name) this.handleFind();
                } else {
                    // send regular location
                    this.syncLoc();
                }


                currentTarget = inRange;
            });

            this.props.locations.forEach(location => {
                console.log("Tracking " + location.name);
                gps.trackLocation(location.name, location.lat, location.lon);
            });

            this.setState({gps});
        }
    }

    syncLoc() {
        new ApiRequest("/api/v1/team/setloc")
            .post()
            .setContext({
                "lat": this.state.myLocation.latitude,
                "lon": this.state.myLocation.longitude
            })
            .auth()
            .run()
            .then(result => {

            })
            .catch((err) => {
                console.log(err)
            });
    }

    handleFind() {
        new ApiRequest("/api/v1/team/pushloc")
            .post()
            .setContext({
                "lat": this.state.myLocation.latitude,
                "lon": this.state.myLocation.longitude
            })
            .auth()
            .run()
            .then(result => {
                if (result.found) {
                    Swal.fire({
                        animation: false,
                        titleText: result.name + ' geclaimed!',
                        text: '+' + result.worth + ' punten'
                    })
                }
            })
            .catch((err) => {
                console.log("whoops")
                console.error(err)
            });
    }

    render() {
        let markers = [];

        // locations
        this.props.locations.forEach(location => {

            // is it claimed? by who?
            if (location.owningTeam === null) {
                markers.push(
                    <Marker key={location.name} lat={location.lat} lon={location.lon} onClick={() => {
                        Swal.fire({
                            animation: false,
                            title: location.name,
                            footer: 'Nog niet door een team geclaimed'
                        })
                    }}>
                        <MarkerLayout>
                            <h2 style={{bottom: '0', right: '0', color: 'black'}}>&#10687;</h2>
                        </MarkerLayout>
                    </Marker>
                )
            } else {
                const team = this.props.teams[location.owningTeam];
                markers.push(
                    <Marker key={location.name} lat={location.lat} lon={location.lon} onClick={() => {
                        Swal.fire({
                            animation: false,
                            title: location.name,
                            footer: 'Geclaimed door ' + team.name
                        })
                    }}>
                        <MarkerLayout>
                            <h2 style={{top: '50%', left: '50%', color: team.color}}>&#10687;</h2>
                        </MarkerLayout>
                    </Marker>
                )
            }
        });

        // you
        if (this.state.myLocation) {
            markers.push(
                <Marker key={'myloc'} lat={this.state.myLocation.latitude} lon={this.state.myLocation.longitude}
                        onClick={() => {
                            Swal.fire({
                                animation: false,
                                text: "Jij bent hier",
                            })
                        }}>
                    <MarkerLayout>
                        <h1 style={{top: '50%', left: '50%', color: 'black'}}>&#8226;</h1>
                    </MarkerLayout>
                </Marker>
            )
        }

        // others? if you are admin
        if (this.props.isAdmin) {
            if (this.props.teams) {
                for (let otherTeam in this.props.teams) {
                    console.log(otherTeam)
                    if (this.props.teams.hasOwnProperty(otherTeam)) {
                        markers.push(
                            <Marker key={'t-' + this.props.teams[otherTeam].name} lat={this.props.teams[otherTeam].lat} lon={this.props.teams[otherTeam].lon}
                                    onClick={() => {
                                        Swal.fire({
                                            animation: false,
                                            text: this.props.teams[otherTeam].name
                                        })
                                    }}>
                                <MarkerLayout>
                                    <h1 style={{top: '50%', left: '50%', color: 'black'}}>&#8226;</h1>
                                </MarkerLayout>
                            </Marker>
                        )
                    }
                }
            }
        }

        return (
            <Map width={'100%'} height={600} onAPIAvailable={function () {
                console.log('API loaded');
            }} loadOptions={{lang: 'en_US'}} center={[position[0], position[1]]} zoom={14}>
                {markers}
            </Map>
        )
    }
}

                for (let otherTeam in this.props.teams) {
                    console.log(otherTeam)
                    if (this.props.teams.hasOwnProperty(otherTeam)) {
                        markers.push(
                            <Marker key={'t-' + this.props.teams[otherTeam].name} lat={this.props.teams[otherTeam].lat} lon={this.props.teams[otherTeam].lon}
                                    onClick={() => {
                                        Swal.fire({
                                            animation: false,
                                            text: this.props.teams[otherTeam].name
                                        })
                                    }}>
                                <MarkerLayout>
                                    <h1 style={{top: '50%', left: '50%', color: 'black'}}>&#8226;</h1>
                                </MarkerLayout>
                            </Marker>
                        )
                    }
                }
            }
        }

        return (
            <Map width={'100%'} height={600} onAPIAvailable={function () {
                console.log('API loaded');
            }} loadOptions={{lang: 'en_US'}} center={[position[0], position[1]]} zoom={14}>
                {markers}
            </Map>
        )
    }
}
