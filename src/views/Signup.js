import React from "react";
import { signup } from "../services/authService";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
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
    signup({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      phone: this.state.phone,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            this.props.authenticate(response.user),
            this.props.history.push("/"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const {
      username,
      email,
      password,
      address,
      phone,
      errorMessage,
    } = this.state;
    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
          <label>username: </label>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>Email: </label>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
          />
          <label>Address: </label>
          <input
            name="address"
            type="address"
            value={address}
            onChange={this.handleChange}
          />
          <label>Phone: </label>
          <input
            name="phone"
            type="phone"
            value={phone}
            onChange={this.handleChange}
            required={true}
          />
          <button type="submit"> Sign up </button>
        </form>
      </div>
    );
  }
}

export default Signup;
