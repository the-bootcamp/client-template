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
    membership: this.props.user ? this.props.user.membership : "",
    defaultcottage: this.props.user ? this.props.user.defaultcottage : "",
    formtype: this.props.formtype,
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value || "",
    });
  };

  changeMemberShip = (evt) => {
    if (this.state.formtype === "edit") {
      let membership = evt.target.value;
      // When updateprofile is clicked
      let defaultcottage =
        membership.toLowerCase().trim() === "silver"
          ? "standard"
          : membership.toLowerCase().trim() === "gold"
          ? "classic"
          : "superior";
      this.setState({ [evt.target.name]: membership, defaultcottage });
    }
  };

  handleSubmit = (event) => {
    console.log(" signup-> handleSubmit(): ", this.props);
    event.preventDefault();
    if (this.state.formtype === "edit") {
      // When updateprofile is clicked

      updateuser(this.state, localStorage.getItem("accessToken"))
        .then((editRes) => {
          console.log(" Edit profile result: ", editRes);
          if (editRes.accessToken) {
            console.log("profile edited successfully ");
            // Todo  this.setState({});
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
        username: this.state.username,
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
              this.props.history.push("/membership"))
            : this.setState({
                errorMessage: response.errorMessage,
              })
        )
        .catch((err) => console.log(err));
    }
  };

  render() {
    console.log(" signup-> render(): ", this.props);
    console.log(" ", this.state);
    const {
      username,
      email,
      password,
      address,
      phone,
      userrole,
      formtype,
      membership,
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
          {formtype === "edit" && (
            <div className="form-group">
              <label>Choose membership: </label>
              <select
                value={membership}
                name="membership"
                className="form-control"
                onChange={this.changeMemberShip}
              >
                <option value="none">none</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
          )}
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
