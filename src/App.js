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
import EditProfile from "./views/user/EditProfile";
import Footer from "./views/layout/Footer";
import MembershipPage from "./views/membership/MembershipPage";

import BookingsPage from "./views/Bookings/BookingsPage";
import ListBookings from "./views/Bookings/ListBookings";
import ManagerCheckout from "./views/Bookings/ManagerCheckout";
import NavBar from "./views/layout/NavBar";
import HomePage from "./views/HomePage";
import { NotFound } from "./views/NotFound";
import RegistrationSuccess from "./views/user/RegistrationSuccess";
import { BookingResultPage } from "./views/Bookings/BookingResultPage";

// import { BookingData } from "./views/Bookings/BookingData";

class App extends React.Component {
  /** STATE: */
  // constructor() {
  //   super();
  //   this.state = {
  //     authenticated: false,
  //     user: {},
  //     cottageSearchRes: {},
  //     bookingStatus: {},
  //     isLoading: true,
  //   };
  //   this.checkAuthentication();
  // }

  state = {
    authenticated: false,
    // authenticated: localStorage.getItem("accessToken") ? true : false,
    user: {},
    cottageSearchRes: {},
    bookingResult: {},
    isLoading: true,
    errorMessage: "",
  };

  checkAuthentication() {
    setTimeout(
      () =>
        this.setState({
          isLoading: false,
        }),
      200
    );
  }

  /**
   *  componentDidMount
   */
  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          if (response.accessToken) {
            this.authenticate(response.userId);
          } else {
            localStorage.removeItem("accessToken");
            this.setState({
              errorMessage: "Access Token is expired",
            });
          }
        })
        .catch((err) => {
          this.setState({
            errorMessage: "Access Token is expiredInvalid Access Token" + err,
          });
          localStorage.removeItem("accessToken");
        });
    }
  };

  setCottageSearchRes = (cottageSearchRes) => {
    this.setState({ cottageSearchRes });
  };

  setBookingResult = (bookgRes, cottageinfo) => {
    this.setState({ bookingResult: { bookgRes, cottageinfo } });
  };
  /**
   *
   * @param {*} user
   */
  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
      isLoading: false,
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
        if (resp.success) {
          this.clearAccessToken();
        }
      })
      .catch((err) =>
        this.setState({ errorMessage: `Error while logout ${err}` })
      );
  };

  addEmailSubscription = (emailID) => {
    addSubscriber(emailID)
      .then((resp) =>
        !resp
          ? this.setState({ errorMessage: "Subscriber not added to list" })
          : console.log("")
      )
      .catch((error) =>
        this.setState({ errorMessage: `Subscriber not added to list ${error}` })
      );
  };

  /**
   * render()
   */
  render() {
    // if (this.state.isLoading) {
    //   return <div> </div>;
    // }

    const { authenticated, user } = this.state;
    return (
      <div className="page-container">
        <div className="page-container content-wrap">
          {/* <BookingData> */}
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
                path="/open-bookings"
                user={user}
                authenticated={authenticated}
                listAll={false}
                bookingResult={this.state.bookingResult}
                component={BookingResultPage}
                // component={ListBookings}
              />

              <CustomerRoute
                exact
                path="/signupsuccess"
                user={user}
                authenticated={authenticated}
                component={RegistrationSuccess}
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
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
          {/* </BookingData> */}
        </div>

        <Footer addEmailSubscription={this.addEmailSubscription} />
      </div>
    );
  }
}

export default App;
