import React from 'react';
import Alert from "reactstrap/es/Alert";
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {locations} from "../data/Locations";
import WebGPS from "../helpers/WebGPS";
import * as Swal from "sweetalert2";

const position = [52.231877, 5.170856];

export default class TagMap extends React.Component {

    state = {
        myLocation: null,
        gps: null
    };

    componentDidMount() {
        let gps = new WebGPS(update => {
            this.setState({
                myLocation: update.location
            })
        });

        this.setState({gps});
    }

    render() {
        let markers = [];

        // locations
        locations.forEach(location => {
            markers.push(
                <Marker lat={location.lat} lon={location.lon} onClick={() => {
                    Swal.fire({
                        animation: false,
                        title: location.name,
                        footer: 'Nog niet door een team geclaimed'
                    })
                }}>
                    <MarkerLayout>
                        <div style={{borderRadius: '50%', overflow: 'hidden'}}>
                            <svg height="100" width="100">
                                <circle cx="30" cy="30" r="10" stroke="black" stroke-width="3" fill="red" />
                            </svg>
                        </div>
                    </MarkerLayout>
                </Marker>
            )
        });

        // you
        if (this.state.myLocation) {
            markers.push(
                <Marker lat={this.state.myLocation.latitude} lon={this.state.myLocation.longitude} onClick={() => {
                    Swal.fire({
                        animation: false,
                        text: "Jij bent hier",
                    })
                }}>
                    <MarkerLayout>
                        <div style={{borderRadius: '50%', overflow: 'hidden'}}>
                            <img height={'30px'} src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"/>
                        </div>
                    </MarkerLayout>
                </Marker>
            )
        }

        return (
            <Map width={'100%'} height={600} onAPIAvailable={function () { console.log('API loaded'); }} loadOptions={{lang: 'en_US'}} center={[position[0], position[1]]} zoom={13}>
                {markers}
            </Map>
        )
    }
}