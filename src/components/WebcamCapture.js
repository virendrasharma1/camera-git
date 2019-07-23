import React from 'react';
import Webcam from "react-webcam";
import Geocode from "react-geocode";

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
        let today = new Date();
        this.setState({
            publicIp: publicIp,
            imageSrc: this.webcam.getScreenshot(),
            curTime: today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear() + " " + today.getHours()+":"+ today.getMinutes()+":" + today.getSeconds(),
            showDetails: true,
        });
    };

    returnBackAlart = () => {
        this.setState({
            showDetails: false
        });
        alert('Data send Successfully!')
    };

    returnBack = () => {
        this.setState({
            showDetails: false
        });
    };

    getMyLocation = (e) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = JSON.stringify(position.coords.longitude);
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
            },
            (error) => console.log(error.message)
        );
    };

    render() {
        const videoConstraints = {
            minWidth: 1280,
            minHeight: 1000,
            facingMode: "user"
        };
        if (!this.state.showDetails) {
            return (
                <div className='text-center cameraHeightBlock'>
                    <Webcam audio={false}
                            ref={this.setRef}
                            screenshotQuality={1}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}/>
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
                    <div className="col-lg-12 p-0">
                        <div className="col-lg-12 capturedImageInfoBottom">
                            <div className="infoBlur">.</div>
                            <table className="">
                                <tr>
                                    <p>
                                        <span className="pull-left">IP: {this.state.publicIPAddress}</span>
                                        <span className="pull-right">Taken on: {this.state.curTime}</span>
                                    </p>
                                </tr>
                            </table>
                        </div>

                        <div className="col-lg-12 p-0 capturedImage">
                            <img src={this.state.imageSrc}/>
                        </div>

                        <div className="col-lg-12 capturedImageInfo">
                            <div className="infoBlur">.</div>
                            <table className="">
                                <tr>
                                    <p>
                                        <span className="pull-left">Longitude: {this.state.longitude}</span>
                                        <span className="pull-right">Latitude: {this.state.latitude}</span>
                                    </p>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="col-lg-12 text-center captureAgain">
                        <button  onClick={this.returnBack}
                                 className="btn btn-info mr-5"
                                 data-toggle="modal"
                                 data-target="#exampleModal">
                            BACK
                        </button>
                        <button  onClick={this.returnBackAlart}
                                className="btn btn-info send-btn"
                                data-toggle="modal"
                                data-target="#exampleModal">
                            SEND
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default WebcamCapture;