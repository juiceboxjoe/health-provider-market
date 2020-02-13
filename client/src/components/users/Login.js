import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendingReq: false,
            req: {
                email: '',
                password: '',
            },
            session: {
                user:'',
                userType: ''
            }
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchSession()
    }

    fetchSession(){
        axios.get("http://localhost:3000/api/users/session")
            .then(res => {
                this.setState({
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

    handleEmailChange(date) {
        let req = {...this.state.req}
        req.email = date;
        this.setState({req});
    };

    handlePasswordChange(event) {
        let req = {...this.state.req}
        req.password = event.target.value;
        this.setState({req});
    };

    handleSubmit(event) {

        this.setState({
            sendingReq: true,
        });

        axios.post("http://localhost:3000/api/users/login", this.state.req)
            .then(res => {
                this.setState({
                    sendingReq: false,
                    error: null,
                    session: {
                        user: res.data.user,
                        userType: res.data.userType,
                    }
                });
            })
            .catch((error) => {
                this.setState({ error, sendingReq: false })
            });
    }

    renderError(){
        if(this.state.error != null){
            return (
                <p className="red-text">
                    "Wrong credentials."
                </p>
            )
        }
        else
            return (null)
    }
    renderContent(){
        if(this.state.sendingReq){
            return (
                <h1>Loading...</h1>
            )
        }
        else if(this.state.session.user != ''){
            return (
                <Redirect to="/" />
            )
        }
        else{
            return (
                <div className="col offset-s3 s6 center">
                    <h5 className="indigo-text">Please, login into your account</h5>
                    <div className="section">
                        {this.renderError()}
                    </div>

                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row"
                             style={{
                                 display: 'inline-block',
                                 padding: '32px 48px 0px 48px',
                                 border: '1px solid #EEE'
                             }}>

                            <form className="col s12" onSubmit={this.handleSubmit}>
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='email' name='email' id='email'/>
                                        <label htmlFor='email'>Enter your email</label>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='password' id='password'/>
                                        <label htmlFor='password'>Enter your password</label>
                                    </div>
                                    <label style={{float: 'right'}}>
                                        <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                                    </label>
                                </div>

                                <br/>

                                <div className='row center'>
                                    <input type="submit" value="Login" className="btn btn-large waves-effect indigo"/>
                                </div>

                            </form>
                        </div>
                    </div>
                    <a href="#!">Create account</a>
                </div>
            );
        }
    }
    render() {
        return (

            <div className="container">
                <div className="section">
                    <div className="row">
                        {this.renderContent()}
                    </div>

                </div>
            </div>

        );
    }
}
export default Login;