import React from "react";
import { updateuser } from "../../services/userService";

class EditProfile extends React.Component {
  state = {
    username: this.props.user ? this.props.user.username : "",
    email: this.props.user ? this.props.user.email : "",
    password: this.props.user ? this.props.user.password : "",
    address: this.props.user ? this.props.user.address : "",
    phone: this.props.user ? this.props.user.phone : "",
    userrole: this.props.user ? this.props.user.userrole : "customer",
    membership: this.props.user ? this.props.user.membership : "",
    defaultcottage: this.props.user ? this.props.user.defaultcottage : "",
    errorMessage: "",
    successMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value || "",
    });
  };

  // changeMemberShip = (evt) => {
  //   let membership = evt.target.value;

  //   let defaultcottage =
  //     membership.toLowerCase().trim() === "silver"
  //       ? "standard"
  //       : membership.toLowerCase().trim() === "gold"
  //       ? "classic"
  //       : "superior";
  //   this.setState({ [evt.target.name]: membership, defaultcottage });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("update profile  button clicked ");
    const { username, email, password, address, phone } = this.state;
    updateuser(
      { username, email, password, address, phone },
      localStorage.getItem("accessToken")
    )
      .then((editRes) => {
        console.log(" EDIT  profile response :", editRes.userInfo);
        if (editRes.success) {
          console.log(" Edit is success ");
          const {
            username,
            email,
            password,
            address,
            phone,
            userrole,
            membership,
            defaultcottage,
          } = editRes.userInfo;
          this.setState({
            successMessage: editRes.success,
            username,
            email,
            password,
            address,
            phone,
            userrole,
            membership,
            defaultcottage,
          });
        } else {
          console.log(" Edit Failed ..  ");
          this.setState({
            errorMessage: editRes.errorMessage,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(" EditProfile-> render(): ", this.props);
    console.log("EditProfile-> render(): ", this.state);
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
          <div className="auth-img col-sm-6">
            <img src="./images/ResortCommon_1.jpg" alt="" />
          </div>
          <div className="col-sm-6">
            {errorMessage !== "" && errorMessage}
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <h3> Edit My Profile </h3>

              <div className="form-group">
                <label>username: </label>
                <input
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  required={true}
                  type="text"
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
                />
              </div>
              {/* <div className="form-group">
              <label>Choose membership: </label>
              <select
               className="form-control"
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
            </div> */}

              <div className="form-group">
                <label>Address: </label>
                <textarea
                  className="form-control"
                  name="address"
                  type="text"
                  value={address}
                  onChange={this.handleChange}
                  required={true}
                ></textarea>
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount = () => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        alert("This page is reloaded");
      } else {
        alert("This page is not reloaded");
      }
    }
  };
}

export default EditProfile;
