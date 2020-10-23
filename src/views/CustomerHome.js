import React, { Component } from "react";
import { updateuser } from "../services/userService";

class CustomerHome extends Component {
  state = {
    user: this.props.user,
    checkInDate: "",
    checkOutDate: "",
  };

  searchAvailability = () => {};

  render() {
    console.log(" home-> render()-> ", this.state.user);
    const { checkInDate, checkOutDate } = this.state;
    return (
      <div>
        <h1>
          welcome {this.state.user.username}
          Chek for cottage avaialbility{" "}
        </h1>
        <form onSubmit={() => this.searchAvailability()}>
          <div className="form-group">
            <label>Check-in date : </label>
            <input type="date" value={checkInDate} name="checkInDate"></input>
          </div>

          <div className="form-group">
            <label>Check-Out Date: </label>
            <input type="date" value={checkOutDate} name="checkOutDate"></input>
          </div>
          <button type="submit"> Search </button>
        </form>
      </div>
    );
  }
}

export default CustomerHome;
