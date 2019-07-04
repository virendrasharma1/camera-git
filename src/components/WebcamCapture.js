import React from 'react';
import Webcam from "react-webcam";
import Geocode from "react-geocode";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Image from "react-bootstrap/Image";

const publicIp = require('public-ip');

class WebcamCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            imageSrc: '',
            publicIPAddress: '',
            curTime: null,
            showDetails: false
        };
    }

    componentDidMount() {
        Geocode.setApiKey("AIzaSyBG3832SwMdrDH4ClPAevaHxxaLMSDHRVo");
        this.getMyLocation();
        (async () => {
            this.setState({
                publicIPAddress: await publicIp.v4()
            })
        })()

    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        this.setState({
            publicIp: publicIp,
            imageSrc: this.webcam.getScreenshot(),
            curTime: new Date().toLocaleString(),
            showDetails: true,
        });
    };

    returnBack = () => {
        this.setState({
            showDetails: false
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
            facingMode: "user"
        };
        if (!this.state.showDetails) {
            return (
                <div className='text-center'>
                    <Webcam
                        audio={false}
                        height={450}
                        ref={this.setRef}
                        screenshotQuality={1}
                        screenshotFormat="image/jpeg"
                        width={800}
                        videoConstraints={videoConstraints}
                    />
                    <div className="align-v-h-center">
                        <button onClick={this.capture}
                                className="btn btn-primary cameraButton"
                                data-toggle="modal"
                                data-target="#exampleModal">
                            <i className="fa fa-camera"/>
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='text-center'>
                    <div className="col-lg-12">
                        <div className="col-lg-12 capturedImage">
                            <img src={this.state.imageSrc}/>
                        </div>
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <tbody>
                                    <tr>
                                        <td className="text-left">
                                            Latitude
                                        </td>
                                        <td className="text-left">
                                            {this.state.latitude}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">
                                            Longitude
                                        </td>
                                        <td className="text-left">
                                            {this.state.longitude}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">
                                            Address
                                        </td>
                                        <td className="text-left">
                                            <p>Defense Layout, 1st Floor, 9th Main</p>
                                            <p>D-Block, Sahakara Nagar</p>
                                            <p>Bengaluru - 560092</p>
                                            <p>Karnataka, India</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">
                                            Taken on
                                        </td>
                                        <td className="text-left">
                                            {this.state.curTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">
                                            IP
                                        </td>
                                        <td className="text-left">
                                            {this.state.publicIPAddress}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div className="text-center">
                        <button onClick={this.returnBack}
                                className="btn btn-primary">
                            Capture Again
                        </button>
                    </div>
                </div>
            );
        }

    }
}

export default WebcamCapture;