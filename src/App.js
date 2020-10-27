import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import ManagerRoute from "./components/auth/ManagerRoute";
import CustomerRoute from "./components/auth/CustomerRoute";
import { validateSession, logout } from "./services/authService";
import CustomerHome from "./views/CustomerHome";
import CottageList from "./views/CottageList";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Footer from "./views/Footer";
import MembershipPage from "./views/MembershipPage";
import "bootstrap/dist/css/bootstrap.css";
import BookingsPage from "./views/BookingsPage";
import ListBookings from "./views/ListBookings";

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

  /**
   * when 'Logout' button clicked
   */
  handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    logout(token)
      .then((resp) => {
        console.log(" logout response: ", resp);
        if (resp.success) {
          localStorage.clear();
          this.setState({
            authenticated: false,
            user: {},
          });
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
              <Link to="/manager"> Cottages </Link>
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
              formtype="edit"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
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
              formtype="signup"
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
