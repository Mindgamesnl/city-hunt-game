import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'css/bootstrap.min.css';

import Row from 'reactstrap/es/Row';
import HomePage from './pages/home/HomePage';

ReactDOM.render(
  <Router>
    <div>
      <Row>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Row>
    </div>
  </Router>,
  document.getElementById('app'),
);
