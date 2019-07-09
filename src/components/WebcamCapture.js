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
            width: 1280,
            height: 1000,
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
                        <div className="col-lg-12 p-0 capturedImage">
                            <img src={this.state.imageSrc}/>
                        </div>

                        <div className="col-lg-12 capturedImageInfoBottom">
                            <div className="infoBlur">.</div>
                            <div className="col-sm-6">
                                <p className="text-left">Taken on:{this.state.curTime}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="text-right">IP:{this.state.publicIPAddress}</p>
                            </div>
                        </div>
                        <div className="col-lg-12 capturedImageInfo">
                            <div className="infoBlur">.</div>
                            <div className="col-sm-6">
                                <p className="text-left">Latitude:{this.state.latitude}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="text-right">Longitude:{this.state.longitude}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center captureAgain align-v-h-center">
                        <button  onClick={this.returnBack}
                                className="btn btn-primary cameraButton"
                                data-toggle="modal"
                                data-target="#exampleModal">
                            <i className="fa fa-camera"/>
                        </button>
                    </div>
                </div>
            );
        }
    }
}



export default WebcamCapture;