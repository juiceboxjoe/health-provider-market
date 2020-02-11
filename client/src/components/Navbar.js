import React, { Component } from "react";
class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav id="nav_f" className="default_color" role="navigation">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" id="logo-container" className="brand-logo">Health Provider Market</a>
                            <ul className="right hide-on-med-and-down">
                                <li><a href="#route">Page</a></li>
                            </ul>
                            <ul id="nav-mobile" className="side-nav">
                                <li><a href="#route">Page</a></li>
                            </ul>
                            <a href="#" data-activates="nav-mobile" className="button-collapse"><i
                                className="mdi-navigation-menu"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;