import React from "react";
import { signup } from "../../services/authService";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

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
      .catch((err) =>
        this.setState({
          errorMessage: err,
        })
      );
  };

  render() {
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
        <form
          autoComplete="off"
          className="login-container"
          onSubmit={this.handleSubmit}
        >
          {errorMessage !== "" && (
            <ResortzyAlert message={errorMessage} style={"danger"} />
          )}
          <div className="input-container p-3">
            <h3 className="text-center p-3">Sign Up </h3>
            {/*  username row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">
                username <span className="mandatory-color "> * </span>
              </label>
              <div className="col-md-5">
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
              <div className="col-md-2"></div>
            </div>
            {/*  email row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">
                Email <span className="mandatory-color "> * </span>
              </label>
              <div className="col-md-5">
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
              <div className="col-md-2"></div>
            </div>
            {/*  password row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">
                Password <span className="mandatory-color "> * </span>
              </label>
              <div className="col-md-5">
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
              <div className="col-md-2"></div>
            </div>
            {/*  phone row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">
                Phone <span className="mandatory-color "> * </span>
              </label>
              <div className="col-md-5">
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
              <div className="col-md-2"></div>
            </div>

            {/*  Address row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">
                Address <span className="mandatory-color "> * </span>
              </label>
              <div className="col-md-5">
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
              <div className="col-md-2"></div>
            </div>

            <div className="form-group row">
              <div className="col-md-5"></div>
              {/* <button type="submit" className="btn btn-primary col-md-2 m-3">Register</button> */}
              <ResortzyButton
                style="btn btn-primary  membership-btn"
                btntext={"Signup"}
              />

              <div className="col-md-5"></div>
            </div>
          </div>
        </form>
      </div>
      /////////////////////////////
    );
  }
}

export default Signup;
