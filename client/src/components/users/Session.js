import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Session extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            error: null,
            session: {
                user:'',
                userType: ''
            },
        };
    }

    componentDidMount() {
        this.fetchSession()
    }

    fetchSession(){
        axios.get("http://localhost:3000/api/users/session")
            .then(res => {
                this.setState({
                    isLoading: false,
                    session: {
                        user: res.data.user,
                        userType: res.data.userType,
                    }
                });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false })
            });
    }

    renderContent(){
        if(this.state.isLoading){
            return (
                <h1>Loading...</h1>
            )
        }
        else if(this.state.error != null){
            return (
                <h1>There was an error fetching your account.</h1>
            )
        }
        else if(this.state.session.user == ''){
            return (
                <div>
                    <Redirect to="/login" />
                </div>

            );
        }
        else{
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}
export default Session;