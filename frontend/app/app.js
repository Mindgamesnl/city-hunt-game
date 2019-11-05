import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'css/bootstrap.min.css';

import Navbar from 'reactstrap/es/Navbar';
import NavbarBrand from 'reactstrap/es/NavbarBrand';
import Row from 'reactstrap/es/Row';
import HomePage from './pages/home/HomePage';

ReactDOM.render(
  <Router>
    <div>
      <Row>
        <Switch>
          <Route path="/about">
            <HomePage />
          </Route>
        </Switch>
      </Row>
    </div>
  </Router>,
  document.getElementById('app'),
);
