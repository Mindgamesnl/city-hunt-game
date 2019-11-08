import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'css/bootstrap.min.css';

import Row from 'reactstrap/es/Row';
import HomePage from './pages/home/HomePage';
import Container from "reactstrap/es/Container";
import ApiRequest from "./helpers/ApiRequest";

new ApiRequest("/api/v1/team")
    .post()
    .auth()
    .run()
    .then(team => {
        window.teamId = team.id;
        ReactDOM.render(
            <Router>
                <div>
                    <Row>
                        <Switch>
                            <Route path="/">
                                <Container>
                                    <HomePage />
                                </Container>
                            </Route>
                        </Switch>
                    </Row>
                </div>
            </Router>,
            document.getElementById('app'),
        );

    })
    .catch(() => {
        document.writeln("Invalid access token.");
    });