import React from "react";
import { signup } from "../services/authService";
import { updateuser } from "../services/userService";

class Signup extends React.Component {
  state = {
    username: this.props.user ? this.props.user.username : "",
    email: this.props.user ? this.props.user.email : "",
    password: this.props.user ? this.props.user.password : "",
    address: this.props.user ? this.props.user.address : "",
    phone: this.props.user ? this.props.user.phone : "",
    userrole: this.props.user ? this.props.user.userrole : "customer",
    formtype: this.props.formtype,
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value || "",
    });
  };

  handleSubmit = (event) => {
    console.log(" signup-> handleSubmit(): ", this.state);
    event.preventDefault();
    if (this.state.formtype === "edit") {
      // When updateprofile is clicked
      updateuser(this.state, localStorage.getItem("accessToken"))
        .then((editRes) => {
          console.log(" Edit profile result: ", editRes);
          if (editRes.accessToken) {
            console.log("profile edited successfully ");
          } else {
            this.setState({
              errorMessage: editRes.errorMessage,
            });
          }
        })
        .catch((err) => console.log(err));
    } else if (this.state.formtype === "signup") {
      // When signup is clicked
      signup({
        username: this.state.user.username,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        phone: this.state.phone,
        userrole: this.state.userrole,
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
    }
  };

  render() {
    // console.log(" signup-> render(): ", this.state);
    const {
      username,
      email,
      password,
      address,
      phone,
      userrole,
      formtype,
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
          <label>Phone: </label>
          <input
            name="phone"
            type="phone"
            value={phone}
            onChange={this.handleChange}
            required={true}
          />
          <label>Address: </label>
          <textarea
            name="address"
            type="text"
            value={address}
            onChange={this.handleChange}
            required={true}
          ></textarea>

          <button type="submit">
            {this.state.formtype === "edit" ? "Update" : "SignUp"}
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
