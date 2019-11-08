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
        teams: PropTypes.object
    };

    static defaultProps = {
        locations: [],
        teams: {}
    };

    componentWillUnmount() {
        this.state.gps.stop();
    }

    componentDidUpdate(prevProps) {
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
                            <div style={{borderRadius: '50%', overflow: 'hidden'}}>
                                <svg height="100" width="100">
                                    <circle cx="30" cy="30" r="10" stroke="black" strokeWidth="3" fill="white"/>
                                </svg>
                            </div>
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
                            <div style={{borderRadius: '50%', overflow: 'hidden'}}>
                                <svg height="100" width="100">
                                    <circle cx="30" cy="30" r="10" stroke="black" strokeWidth="3"
                                            fill={'' + team.color}/>
                                </svg>
                            </div>
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
                        <svg height="70" width="70" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/>
                        </svg>
                    </MarkerLayout>
                </Marker>
            )
        }

        return (
            <Map width={'100%'} height={600} onAPIAvailable={function () {
                console.log('API loaded');
            }} loadOptions={{lang: 'en_US'}} center={[position[0], position[1]]} zoom={13}>
                {markers}
            </Map>
        )
    }
}