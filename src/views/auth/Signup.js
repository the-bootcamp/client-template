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

  // changeMemberShip = (evt) => {
  //   if (this.state.formtype === "edit") {
  //     let membership = evt.target.value;
  //     // When updateprofile is clicked
  //     let defaultcottage =
  //       membership.toLowerCase().trim() === "silver"
  //         ? "standard"
  //         : membership.toLowerCase().trim() === "gold"
  //         ? "classic"
  //         : "superior";
  //     this.setState({ [evt.target.name]: membership, defaultcottage });
  //   }
  // };

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
      // membership,
      errorMessage,
    } = this.state;
    return (
      <div className="auth-form  container-fluid">
        <div className="row">
          <div className="signUp-img col-sm-6">
            <img src="./images/ResortCommon_1.jpg" alt="" />
          </div>
          <div className="col-sm-6">
            {errorMessage !== "" && errorMessage}
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <h3> Sign Up </h3>

              <div className="form-group">
                <label>username: </label>
                <input
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  required={true}
                  type="text"
                  autoComplete="off"
                />
              </div>

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

              <div className="form-group">
                <label>Phone: </label>
                <input
                  className="form-control"
                  name="phone"
                  type="phone"
                  value={phone}
                  onChange={this.handleChange}
                  required={true}
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Address: </label>
                <textarea
                  className="form-control"
                  name="address"
                  type="text"
                  value={address}
                  onChange={this.handleChange}
                  required={true}
                  autoComplete="off"
                ></textarea>
              </div>

              <button type="submit">SignUp</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
