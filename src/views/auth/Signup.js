import React from "react";
import { signup } from "../../services/authService";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    userrole: "customer",
    membership: "",
    defaultcottage: "",
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
    event.preventDefault();

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
  };

  render() {
    console.log(" signup-> render(): ", this.props);
    console.log("signup-> render(): ", this.state);
    const {
      username,
      email,
      password,
      address,
      phone,
      // userrole,
      membership,
      errorMessage,
    } = this.state;
    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>username: </label>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
            required={true}
            type="text"
            autoComplete="off"
          />
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
          <label>Phone: </label>
          <input
            name="phone"
            type="phone"
            value={phone}
            onChange={this.handleChange}
            required={true}
            autoComplete="off"
          />
          <label>Address: </label>
          <textarea
            name="address"
            type="text"
            value={address}
            onChange={this.handleChange}
            required={true}
            autoComplete="off"
          ></textarea>
          <button type="submit">SignUp</button>
        </form>
      </div>
    );
  }
}

export default Signup;
