import React from 'react';
import './App.css';
import logo from './assets/logo.png';
import WebcamCapture from "./components/WebcamCapture";
import {Link} from "react-router-dom";

function App() {

    return (
        <div>
            <nav className="navbar navbar-static">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <img src={logo} className='brandLogo'/>
                        </a>
                    </div>
                </div>
            </nav>

        <div className='cameraMainBlock'>
        {/*<WebcamCapture/>*/}
            <Link to="/webcam">
            <button className="btn btn-primary">Go to main page</button>
            </Link>
        </div>
        </div>
    );
}

export default App;
