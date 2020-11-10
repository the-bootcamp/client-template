import React from "react";
import { login } from "../../services/authService";
import "./Auth.css";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    login({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
          this.props.authenticate(response.user);

          response.user.userrole === "manager"
            ? this.props.history.push("/manager")
            : this.props.history.push("/home");
        } else {
          this.setState({
            errorMessage: response.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className="auth-form  container-fluid">
        <form
          autoComplete="off"
          className="login-container"
          onSubmit={this.handleSubmit}
        >
          {errorMessage !== "" && (
            <ResortzyAlert message={errorMessage} style={"danger"} />
          )}
          <div className="input-container p-3">
            <h3 className="text-center p-3">Login </h3>
            {/*  email row */}
            <div className="form-group row">
              <div class="col-md-2"></div>
              <label className="col-md-3">
                Email <span class="mandatory-color "> * </span>
              </label>
              <div class="col-md-5">
                <input
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required={true}
                  type="email"
                  autoComplete="off"
                />
              </div>
              <div class="col-md-2"></div>
            </div>
            {/*  password row */}
            <div className="form-group row">
              <div class="col-md-2"></div>
              <label className="col-md-3">
                Password <span class="mandatory-color "> * </span>{" "}
              </label>
              <div class="col-md-5">
                <input
                  autoComplete="off"
                  className="form-control"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  required={true}
                />
              </div>
              <div class="col-md-2"></div>
            </div>

            <div class="form-group row">
              <div class="col-md-5"></div>
              {/* <button type="submit" class="btn btn-primary col-md-2 m-3">Register</button> */}
              <ResortzyButton
                style="btn btn-primary  membership-btn"
                btntext={"Login"}
              />

              <div class="col-md-5"></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
