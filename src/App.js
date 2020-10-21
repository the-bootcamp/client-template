import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import ManagerRoute from "./components/auth/ManagerRoute";
import { validateSession, logout } from "./services/authService";
import CustomerHome from "./views/CustomerHome";
import CottageList from "./views/CottageList";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Footer from "./views/Footer";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  /** STATE: */
  state = {
    authenticated: false,
    user: {},
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
    const { authenticated } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            {authenticated && this.state.user.userrole === "manager" && (
              <Link to="/manager"> Cottages </Link>
            )}
            {authenticated && <Link to="/"> Home </Link>}
            {authenticated && <Link to="/editprofile"> Edit Profile </Link>}
            {!authenticated && <Link to="/login"> Login </Link>}
            {!authenticated && <Link to="/signup"> Signup </Link>}
            {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
          </nav>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={CustomerHome}
            />
            <ManagerRoute
              exact
              path="/manager"
              user={this.state.user}
              authenticated={authenticated}
              component={CottageList}
            />
            {/* <ManagerRoute
              exact
              path="/manager/add-cottage"
              user={this.state.user}
              authenticated={authenticated}
              component={AddCottage}
            /> */}

            <PrivateRoute
              exact
              path="/editprofile"
              user={this.state.user}
              formtype="edit"
              authenticated={authenticated}
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
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
