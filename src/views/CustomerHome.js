import React, { Component } from "react";
import { addABooking } from "../services/bookingService";
import { searchAvailabilty, getallCottages } from "../services/cottageService";
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
    const {
      checkindate,
      checkoutdate,
      user: { defaultcottage },
    } = this.state;
    console.log(defaultcottage);

    searchAvailabilty(
      { checkindate, checkoutdate, defaultcottage },
      localStorage.getItem("accessToken")
    ).then((searchRes) => console.log(searchRes));
  };

  /**
   *
   */
  addBooking = () => {
    const booking = {
      userId: this.state.user._id,
      checkindate: this.state.checkindate,
      checkoutdate: this.state.checkindate,
      bookingdate: new Date(),
      cottageId: this.state.cottageId,
      cottageNumber: 1,
      adults: 2,
      kids: 2,
      bookingstatus: "open",
    };
    addABooking(booking, localStorage.getItem("accessToken"))
      .then((bookingRes) => console.log(bookingRes))
      .catch((error) => console.log(error));
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
    console.log(" home-> render()-> ", this.state);
    const { checkoutdate, checkindate } = this.state;
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
        <form onSubmit={this.searchAvailability}>
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
