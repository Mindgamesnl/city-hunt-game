import React from 'react';
import PropTypes from 'prop-types';
import {Map, Marker, MarkerLayout} from 'yandex-map-react';
import WebGPS from "../helpers/WebGPS";
import * as Swal from "sweetalert2";
import ApiRequest from "../helpers/ApiRequest";
import Table from "reactstrap/es/Table";

export default class ScoreBoard extends React.Component {


    static propTypes = {
        teams: PropTypes.any
    };

    static defaultProps = {
        teams: {}
    };

    render() {
        let states = [];

        for (let teamId in this.props.teams) {
            if (this.props.teams.hasOwnProperty(teamId)) {
                states.push(
                    <tr key={teamId}>
                        <td>{this.props.teams[teamId].name}</td>
                        <td>{this.props.teams[teamId].score}</td>
                    </tr>
                )
            }
        }

        // locations
        return (
            <Table>
                <thead>
                <tr>
                    <th>Team naam</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {states}
                </tbody>
            </Table>
        )
    }
}