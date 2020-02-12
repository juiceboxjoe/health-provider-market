import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Providers from "./components/providers/Providers";
import MakeAppointment from "./components/appointments/MakeAppointment";


class App extends Component {
  render() {
        return (
            <Router>
                <div className="App">
                  <Navbar/>
                  <Route exact path="/" component={Providers} />
                  <Route exact path="/make_appointment/:providerId" component={MakeAppointment} />
                </div>
                {/*<Redirect exact from="/" to="/providers" />*/}
            </Router>
        );
  }
}
export default App;