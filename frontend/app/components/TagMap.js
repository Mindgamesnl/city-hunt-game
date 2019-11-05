import React from 'react';
import Alert from "reactstrap/es/Alert";
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {locations} from "../data/Locations";

const position = [52.231877, 5.170856];

export default class TagMap extends React.Component {

    render() {

        let markers = [];
        locations.forEach(location => {
            markers.push(
                <Marker lat={location.lat} lon={location.lon}>
                    <MarkerLayout>
                        <div style={{borderRadius: '50%', overflow: 'hidden'}}>
                            <img height={'30px'} src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"/>
                        </div>
                    </MarkerLayout>
                </Marker>
            )
        });

        return (
            <Map width={'100%'} height={600} onAPIAvailable={function () { console.log('API loaded'); }} loadOptions={{lang: 'en_US'}} center={[position[0], position[1]]} zoom={13}>
                {markers}
            </Map>
        )
    }
}