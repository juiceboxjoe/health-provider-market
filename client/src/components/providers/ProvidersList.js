import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Session from "../users/Session";

class ProvidersList extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            providers: [],
            error: null,
        };
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

    make_appointment(){
        return (null);
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
                            <ul key={provider._id} className="collection card">
                                <li className="collection-item">
                                    <div className="row">
                                        <div className="avatar left-align col s6">
                                            <i className="material-icons circle">person</i>
                                            <span className="title">{provider.name} </span>
                                            <p>{provider.type_of_doctor}<br/>
                                                {provider.address.street} <br/>
                                                {provider.address.city}, {provider.address.state}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row card-action">
                                        <Link to={{pathname: `make_appointment/${provider._id}`}}>Make Appointment</Link>
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
            <Session>
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 center small">
                                {this.renderProviders()}
                            </div>
                        </div>

                    </div>
                </div>
            </Session>

        );
    }
}

export default ProvidersList;