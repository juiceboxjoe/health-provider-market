import React, { Component } from "react";
import M from 'materialize-css'
import axios from "axios";
import Session from "../users/Session";
import {Link} from "react-router-dom";

class MakeAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendingReq: false,
            res: '',
            provider: '',
            req: {
                providerId: props.match.params.providerId || '',
                patientId: "5e3f855daef9090896b414e7",
                date: '',
                startTime: '',
                endTime: '',
                appointmentReason: ''
            }
        };

        this.datepickerRef = React.createRef();

        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchProvider()

        let self = this;

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.datepicker');
            var instances = M.Datepicker.init(elems, {
                onSelect: (date) => {
                    self.handleDateChange(date);
                }
            });
        });
    }

    fetchProvider(){
        axios.get("http://localhost:3000/api/providers/read?providerId=" + this.state.req.providerId)
            .then(res => {
                this.setState({
                    isLoading: false,
                    provider: res.data.provider,
                });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false })
            });
    }

    handleStartTimeChange(event) {
        let req = {...this.state.req}
        req.startTime = event.target.value;
        this.setState({req});
    }

    handleEndTimeChange(event) {
        let req = {...this.state.req}
        req.endTime = event.target.value;
        this.setState({req});
    }

    handleDateChange(date) {
        let req = {...this.state.req}
        req.date = date;
        this.setState({req});
    };

    handleReasonChange(event) {
        let req = {...this.state.req}
        req.appointmentReason = event.target.value;
        this.setState({req});
    };

    handleSubmit(event) {
        let req = {...this.state.req}
        let newStartTime = new Date(req.date.getTime());
        let newEndTime = new Date(req.date.getTime());
        newStartTime = new Date(newStartTime.setHours(newStartTime.getHours() + parseInt(req.startTime.substring(0, 2))))
        req.startTime = new Date(newStartTime.setMinutes(newStartTime.getMinutes() + parseInt(req.startTime.substring(3, 5))))
        newEndTime = new Date(newEndTime.setHours(newEndTime.getHours() + parseInt(req.endTime.substring(0, 2))))
        req.endTime = new Date(newEndTime.setMinutes(newEndTime.getMinutes() + parseInt(req.endTime.substring(3, 5))))

        this.setState({
            sendingReq: true,
            req
        }, () => {
            axios.post("http://localhost:3000/api/appointments/create", this.state.req)
                .then(res => {
                    this.setState({
                        sendingReq: false,
                        error: null,
                        res: res.data
                    });
                })
                .catch((error) => {
                    this.setState({ error, sendingReq: false })
                });
        });
    }

    renderProviderCard(){
        if(this.state.provider != ''){
            return(
                <ul key={this.state.provider._id} className="collection card col offset-s3 s6">
                    <li className="collection-item avatar">
                        <i className="material-icons circle">person</i>
                        <span className="title">{this.state.provider.name}</span>
                        <p>{this.state.provider.type_of_doctor}<br/>
                            {this.state.provider.phone} <br/>
                            {this.state.provider.address.street} <br/>
                            {this.state.provider.address.city}, {this.state.provider.address.state}
                        </p>
                    </li>
                </ul>
            )
        }
        else
            return (null)

    }

    renderContent(){
        if(this.state.sendingReq){
            return (
                <h1 className="center">Loading...</h1>
            )
        }
        else if(this.state.error != null){
            return (
                <h1 className="center">There was an error booking your appointment. Please try again later.</h1>
            )
        }
        else if(this.state.res != ''){
            return (
                <h1 className="center">Your appointment was scheduled successfully!</h1>
            )
        }
        else{
            return (
                <div>
                    {this.renderProviderCard()}
                    <div className="card col offset-s3 s6 center">
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Date:
                                    <input ref={this.datepickerRef} className="datepicker" type="text" key="date" value={this.state.req.date} onChange={this.handleDateChange} />
                                </label>
                                <div className="row">
                                    <div className="col s4 offset-s2">
                                        <label>
                                            Start Time:
                                            <input type="time" key="startTime" value={this.state.req.startTime} onChange={this.handleStartTimeChange} required/>
                                        </label>
                                    </div>
                                    <div className="col s4">
                                        <label>
                                            End Time:
                                            <input type="time" key="endTime" value={this.state.req.endTime} onChange={this.handleEndTimeChange} required/>
                                        </label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" required value={this.state.req.appointmentReason} onChange={this.handleReasonChange}></textarea>
                                        <label htmlFor="textarea1">Appointment Reason</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input key={this.state.req.providerId} type="submit" value="Submit" className="btn"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            // <Session>
                <div className="container">
                    <div className="section">
                        <div className="row">
                            {this.renderContent()}
                        </div>

                    </div>
                </div>
            // </Session>
        );
    }
}
export default MakeAppointment;