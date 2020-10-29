import React, { Component } from "react";

import {
  searchAvailabilty,
  getallCottages,
} from "../../services/cottageService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CustomerHome extends Component {
  state = {
    user: this.props.user,
    checkindate: "",
    checkoutdate: "",
    bookingdate: "",
    cottageId: "",
    checkOutMinDate: "",
    errorMessage: "",
  };

  //temporary
  componentDidMount = () => {
    getallCottages(localStorage.getItem("accessToken"))
      .then((cottagesList) => {
        console.log(cottagesList.allCottages[0]._id);
        this.setState({ cottageId: cottagesList.allCottages[0]._id });
      })
      .catch((error) => console.log("Error in finding the cottages", error));
  };

  searchAvailability = (evt) => {
    evt.preventDefault();
    let {
      checkindate,
      checkoutdate,
      cottageId,
      user: { defaultcottage },
    } = this.state;

    // checkindate = checkindate.toLocaleDateString("de-DE");
    // checkoutdate = checkoutdate.toLocaleDateString("de-DE");

    searchAvailabilty(
      {
        checkindate,
        checkoutdate,
        defaultcottage,
        cottageId,
      },
      localStorage.getItem("accessToken")
    ).then((searchRes) => {
      console.log(searchRes);
      if (searchRes && searchRes.cottagesAvailability) {
        this.props.setCottageSearchRes(searchRes.cottagesAvailability);
        this.props.history.push("/bookings");
      } else {
        console.log(" cottage not availbe ", searchRes.error);
        this.setState({ errorMessage: searchRes.error });
      }
    });
  };

  /**
   *
   * @param {*} selectedDate
   * @param {*} name
   */
  setSelectedDate = (selectedDate, name) => {
    if (name === "checkindate") {
      this.setState({ checkOutMinDate: selectedDate });
      this.state.checkoutdate <= selectedDate
        ? this.setState({ checkoutdate: selectedDate })
        : console.log("");
    }
    this.setState({ [name]: selectedDate });
  };

  render() {
    console.log(" CustomerHome-> render()-> ", this.state);
    const { checkoutdate, checkindate, errorMessage } = this.state;
    let { checkOutMinDate } = this.state;
    let minimunDate = new Date();
    let maximunDate = new Date();
    let numberOfDaysToAdd = 6;
    minimunDate.setDate(minimunDate.getDate() + numberOfDaysToAdd);
    numberOfDaysToAdd = 90;
    maximunDate.setDate(maximunDate.getDate() + numberOfDaysToAdd);
    checkOutMinDate = checkOutMinDate ? checkOutMinDate : minimunDate;

    return (
      <div>
        <h1>
          welcome {this.state.user.username}
          Check for cottage avaialbility{" "}
        </h1>
        {errorMessage !== "" && errorMessage}
        <form
          autoComplete="off"
          onSubmit={this.searchAvailability}
          autoComplete="off"
        >
          <div className="form-group">
            <label>Check-in date : </label>

            <DatePicker
              selected={checkindate}
              name="checkindate"
              onChange={(date) => this.setSelectedDate(date, "checkindate")}
              dateFormat="dd/MM/yyyy"
              minDate={minimunDate}
              maxDate={maximunDate}
              filterDate={(date) => date.getDay() !== 6 || date.getDay() !== 0}
              isClearable // to get a clear button
            />
          </div>
          <div className="form-group">
            <label>Check-Out Date: </label>
            <DatePicker
              name="checkoutdate"
              selected={checkoutdate}
              onChange={(date) => this.setSelectedDate(date, "checkoutdate")}
              dateFormat="dd/MM/yyyy"
              minDate={checkOutMinDate}
              maxDate={maximunDate}
              filterDate={(date) => date.getDay() !== 6 || date.getDay() !== 0}
              isClearable // to get a clear button
            />
          </div>
          <button type="submit"> Search </button>
        </form>
      </div>
    );
  }
}

export default CustomerHome;
