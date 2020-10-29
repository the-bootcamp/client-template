import React from "react";
import { login } from "../../services/authService";

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
      <div>
        {errorMessage !== "" && errorMessage}
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>Email: </label>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
            autoComplete="off"
          />
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
            autoComplete="off"
          />
          <button type="submit"> Login </button>
        </form>
      </div>
    );
  }
}

export default Login;
