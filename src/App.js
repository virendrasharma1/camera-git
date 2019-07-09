import React from 'react';
import './App.css';
import WebcamCapture from "./components/WebcamCapture";
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import Navbar from "./components/navbar";

function App() {

    const routing = (
        <Router>
            <div>
                <Route path="" component={WebcamCapture}/>
            </div>
        </Router>
    );

    return (


        <div className="cameraParentBlock">
            <Navbar/>
            <div className='cameraMainBlock'>
                <WebcamCapture/>
            </div>
        </div>
    );
}

export default App;
