import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';

import 'css/bootstrap.min.css';

import HomePage from './pages/home/HomePage';
import Container from "reactstrap/es/Container";
import ApiRequest from "./helpers/ApiRequest";
import AdminPage from "./pages/home/AdminPage";

new ApiRequest("/api/v1/team")
    .post()
    .auth()
    .run()
    .then(team => {
        window.teamId = team.id;
        ReactDOM.render(
            <Container>
                <HomePage />
            </Container>,
            document.getElementById('app'),
        );
    })
    .catch(() => {
        ReactDOM.render(
            <Container>
                <AdminPage />
            </Container>,
            document.getElementById('app'),
        );
    });