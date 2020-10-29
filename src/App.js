import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import ManagerRoute from "./components/auth/ManagerRoute";
import CustomerRoute from "./components/auth/CustomerRoute";
import { validateSession, logout } from "./services/authService";
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

class App extends React.Component {
  con;
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

  /**
   * render()
   */
  render() {
    console.log(" App-> render()-> ", this.state);
    const { authenticated, user } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            {authenticated && <Link to="/home"> Home </Link>}
            {authenticated && <Link to="/editprofile"> Edit Profile </Link>}
            {authenticated && user.userrole === "manager" && (
              <div>
                <Link to="/manager"> Cottages </Link>
                <Link to="/manager/checkout"> check Out </Link>
              </div>
            )}
            {authenticated && user.userrole === "customer" && (
              <Link to="/my-bookings"> My Bookings </Link>
            )}
            {!authenticated && <Link to="/login"> Login </Link>}
            {!authenticated && <Link to="/signup"> Signup </Link>}
            {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
          </nav>
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
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
