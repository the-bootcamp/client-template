import React from "react";
import { login } from "../../services/authService";
import "./Auth.css";

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
        console.log(" =========== ");
        console.log(response.success);
        console.log(response.user);

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
      <div>
        <div className="auth-form  container-fluid">
          <div className="row">
            <div className="auth-img col-sm-6">
              <img src="./images/ResortCommon_1.jpg" alt="" />
            </div>
            <div className="col-sm-6">
              {errorMessage !== "" && errorMessage}
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <h3> Login </h3>

                <div className="form-group">
                  <label>Email: </label>
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

                <div className="form-group">
                  <label>Password: </label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    required={true}
                    autoComplete="off"
                  />
                </div>

                <button type="submit"> Login </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
