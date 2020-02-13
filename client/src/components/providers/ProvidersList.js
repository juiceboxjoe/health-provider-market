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

    renderProviders(){
        if(this.state.isLoading){
            return (
                <h1 className="center">Loading...</h1>
            )
        }
        else if(this.state.error != null){
            return (
                <h1 className="center">There was an error loading this page.</h1>
            )
        }
        else if(this.state.providers.length == 0){
            return (
                <h1 className="center">No hay medicos en el sistema.. se fueron. esto se jo... lol.</h1>
            )
        }
        else{
            return (
                <div>
                    {this.state.providers.map((provider) => {
                        return (
                            <ul key={provider._id} className="collection card col offset-s3 s6">
                                <li className="collection-item avatar">
                                    <i className="material-icons circle">person</i>
                                    <span className="title">{provider.name}</span>
                                    <p>{provider.type_of_doctor}<br/>
                                        {provider.phone} <br/>
                                        {provider.address.street} <br/>
                                        {provider.address.city}, {provider.address.state}
                                    </p>
                                    <Link className="secondary-content btn" to={{pathname: `make_appointment/${provider._id}`}}>
                                        Make Appointment
                                    </Link>
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
                            <div className="col s12 small">
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