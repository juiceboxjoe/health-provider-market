import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class ProvidersList extends Component {
    state = {
        isLoading: true,
        providers: [],
        error: null
    }

    componentDidMount() {
        this.fetchProviders()
    }

    fetchProviders() {
        axios.get("http://localhost:3000/api/providers/list")
            .then(res => {
                this.setState({
                    providers: res.data.providers,
                    isLoading: false,
                    error: null
                });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false })
            });
    }

    renderProviders(){
        if(this.state.isLoading){
            return (
                <h1>Loading...</h1>
            )
        }
        else if(this.state.error != null){
            return (
                <h1>There was an error loading this page.</h1>
            )
        }
        else{
            return (
                <div>
                    {this.state.providers.map((provider) => {
                        return (
                            <ul className="collection card">
                                <li className="collection-item avatar left-align">
                                    <i className="material-icons circle">person</i>
                                    <span className="title">{provider.name} </span>
                                    <p>{provider.type_of_doctor}<br/>
                                        {provider.address.street} <br/>
                                        {provider.address.city}, {provider.address.state}
                                    </p>
                                    <div className="card-action">
                                        <Link to="/make_appointment" activeClassName="active">Schedule Appointment</Link>
                                    </div>
                                </li>
                            </ul>
                        );
                        })
                    }
                </div>

            );
        }
    }
    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 center small">
                            {this.renderProviders()}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProvidersList;