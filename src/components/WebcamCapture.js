import React from 'react';
import Webcam from "react-webcam";
import Geocode from "react-geocode";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Image from "react-bootstrap/Image";

var a;

class WebcamCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            imageSrc: '',
            isLoggedIn: true
        };
    }

    componentDidMount() {
        Geocode.setApiKey("AIzaSyBG3832SwMdrDH4ClPAevaHxxaLMSDHRVo");
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        this.getMyLocation();
        this.setState({
            imageSrc: this.webcam.getScreenshot(),
            isLoggedIn : false
        });
    };

    getMyLocation = (e) => {
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const latitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const longitude = JSON.stringify(position.coords.latitude);
                this.setState({
                    latitude,
                    longitude
                });
                Geocode.fromLatLng(latitude, longitude).then(
                    response => {
                        const address = response.results[0].formatted_address;
                        alert(address);
                    },
                    error => {
                        console.error(error);
                    }
                );
                //getting the Latitude from the location json
            },
            (error) => console.log(error.message)
        );

    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 1000,
            facingMode: "environment"
        };
        if (this.state.isLoggedIn) {
            return (

                <div>
                    <Webcam
                        audio={false}
                        height={450}
                        ref={this.setRef}
                        screenshotQuality={1}
                        screenshotFormat="image/jpeg"
                        width={800}
                        videoConstraints={videoConstraints}
                    />
                    <button onClick={this.capture} className="btn btn-primary" data-toggle="modal"
                            data-target="#exampleModal"> Capture Screenhot and Location
                    </button>

                </div>
            );
        } else {
            return (
                <div>
                <img src={this.state.imageSrc}/>
                <p>Latitude : {this.state.latitude}</p>
                <p>Longitude : {this.state.longitude}</p>
                </div>
            );
        }
    }
}

export default WebcamCapture;