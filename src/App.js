import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession, logout } from "./services/authService";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";

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
   *
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
   *
   */
  render() {
    const { authenticated } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            {authenticated && <Link to="/"> Home </Link>}
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
              component={Home}
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
