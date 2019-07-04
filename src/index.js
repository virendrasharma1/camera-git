import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Details from './components/Details.js'
import WebcamCapture from "./components/WebcamCapture";

const routing = (
    <Router>
        <div>
            {/*<Route path="/" component={App} />*/}
            <Route path="/details" component={Details} />
            <Route path="/webcam" component={WebcamCapture} />
            <Redirect from="/" to="webcam" />
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
