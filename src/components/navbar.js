import React from 'react';
import logo from "../assets/logo.png";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

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
            </div>
        );
    }
}

export default Navbar;