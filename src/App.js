import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import ManagerRoute from "./components/auth/ManagerRoute";
import CustomerRoute from "./components/auth/CustomerRoute";
import { validateSession, logout } from "./services/authService";
import { addSubscriber } from "./services/userService";
import CustomerHome from "./views/Bookings/CustomerHome";
import CottageList from "./views/cottages/CottageList";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import EditProfile from "./views/EditProfile";
import Footer from "./views/layout/Footer";
import MembershipPage from "./views/auth/MembershipPage";

import BookingsPage from "./views/Bookings/BookingsPage";
import ListBookings from "./views/Bookings/ListBookings";
import ManagerCheckout from "./views/Bookings/ManagerCheckout";
import NavBar from "./views/layout/NavBar";
import HomePage from "./views/HomePage";

class App extends React.Component {
  /** STATE: */
  state = {
    authenticated: false,
    user: {},
    cottageSearchRes: {},
    bookingStatus: {},
  };

  /**
   *  componentDidMount
   */
  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    }
  };

  setCottageSearchRes = (cottageSearchRes) => {
    this.setState({ cottageSearchRes });
  };

  setBookingResult = () => {
    this.setState({ bookingStatus: true });
  };
  /**
   *
   * @param {*} user
   */
  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
    });
  };

  clearAccessToken = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };

  /**
   * when 'Logout' button clicked
   */
  handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    logout(token)
      .then((resp) => {
        console.log(" logout response: ", resp);
        if (resp.success) {
          this.clearAccessToken();
        }
      })
      .catch((err) => console.log(err));
  };

  addEmailSubscription = (emailID) => {
    // console.log(" App.js email subscription clicked .... ");
    addSubscriber(emailID)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };
  /**
   * render()
   */
  render() {
    console.log(" App-> render()-> ", this.state);
    const { authenticated, user } = this.state;
    return (
      <div className="page-container">
        <div className="content-wrap">
          <BrowserRouter>
            <NavBar
              user={user}
              authenticated={authenticated}
              handleLogout={this.handleLogout}
            />

            <Switch>
              <ManagerRoute
                exact
                path="/manager"
                user={user}
                authenticated={authenticated}
                component={CottageList}
              />
              <ManagerRoute
                exact
                path="/manager/checkout"
                user={user}
                authenticated={authenticated}
                component={ManagerCheckout}
              />
              <CustomerRoute
                exact
                path="/membership"
                user={user}
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={MembershipPage}
              />
              <PrivateRoute
                exact
                path="/editprofile"
                user={user}
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={EditProfile}
              />
              <AnonRoute
                exact
                path="/login"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={Login}
              />
              <AnonRoute
                exact
                path="/signup"
                authenticated={authenticated}
                authenticate={this.authenticate}
                component={Signup}
              />
              <CustomerRoute
                exact
                path="/bookings"
                user={user}
                authenticated={authenticated}
                setBookingResult={this.setBookingResult}
                cottageSearchRes={this.state.cottageSearchRes}
                component={BookingsPage}
              />
              <CustomerRoute
                exact
                path="/my-bookings"
                user={user}
                authenticated={authenticated}
                listAll={true}
                clearSession={this.clearAccessToken}
                component={ListBookings}
              />
              <CustomerRoute
                exact
                path="/open-bookings"
                user={user}
                authenticated={authenticated}
                listAll={false}
                component={ListBookings}
              />
              {/* <AnonRoute
              exact
              path="/"
              user={user}
              authenticated={authenticated}
              setCottageSearchRes={this.setCottageSearchRes}
              component={CustomerHome}
            /> */}
              <CustomerRoute
                exact
                path="/home"
                user={user}
                authenticated={authenticated}
                setCottageSearchRes={this.setCottageSearchRes}
                component={CustomerHome}
              />
              <Route exact path="/" component={HomePage} />
            </Switch>
          </BrowserRouter>
        </div>

        <Footer addEmailSubscription={this.addEmailSubscription} />
      </div>
    );
  }
}

export default App;
