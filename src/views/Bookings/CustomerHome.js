import React, { Component } from "react";
import {
  searchAvailabilty,
  getallCottages,
} from "../../services/cottageService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Bookings.css";

class CustomerHome extends Component {
  state = {
    user: this.props.user,
    checkindate: "",
    checkoutdate: "",
    bookingdate: "",
    // cottageId: "",
    checkOutMinDate: "",
    errorMessage: "",
  };

  //temporary
  // componentDidMount = () => {
  // getallCottages(localStorage.getItem("accessToken"))
  //   .then((cottagesList) => {
  //     console.log(cottagesList.allCottages[0]._id);
  //     // this.setState({ cottageId: cottagesList.allCottages[0]._id });
  //   })
  //   .catch((error) => console.log("Error in finding the cottages", error));
  // };

  searchAvailability = (evt) => {
    evt.preventDefault();
    let {
      checkindate,
      checkoutdate,
      // cottageId,
      user: { cottagetype: defaultcottage },
    } = this.state;

    // checkindate = checkindate.toLocaleDateString("de-DE");
    // checkoutdate = checkoutdate.toLocaleDateString("de-DE");
    console.log(defaultcottage);
    searchAvailabilty(
      {
        checkindate,
        checkoutdate,
        defaultcottage,
        // cottageId,
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
        <div className="search-form-img">
          <img
            className="search-form-img"
            src="/images/ResortCommon_1.jpg"
            alt=""
          />
        </div>
        <div className="container-fluid">
          <form
            className="form-inline search-form"
            autoComplete="off"
            onSubmit={this.searchAvailability}
          >
            <div className="form-group mb-2">
              <label style={{ background: "white" }}>
                Search For Availability:
              </label>
            </div>

            <div className="form-group mb-2">
              {/*  className="form-group" */}
              <label style={{ background: "white" }}>Check-in date : </label>
              <DatePicker
                selected={checkindate}
                name="checkindate"
                onChange={(date) => this.setSelectedDate(date, "checkindate")}
                dateFormat="dd/MM/yyyy"
                minDate={minimunDate}
                maxDate={maximunDate}
                filterDate={(date) =>
                  date.getDay() !== 6 || date.getDay() !== 0
                }
                closeOnScroll={true}
                isClearable // to get a clear button
                placeholderText="Click to choose date ..."
              >
                <div style={{ color: "red" }}>
                  Don't forget to check the weather!
                </div>
              </DatePicker>
            </div>
            <div className="form-group mb-2">
              <label style={{ background: "white" }}>Check-Out Date: </label>
              <DatePicker
                name="checkoutdate"
                selected={checkoutdate}
                onChange={(date) => this.setSelectedDate(date, "checkoutdate")}
                dateFormat="dd/MM/yyyy"
                minDate={checkOutMinDate}
                maxDate={maximunDate}
                filterDate={(date) =>
                  date.getDay() !== 6 || date.getDay() !== 0
                }
                closeOnScroll={true}
                isClearable // to get a clear button
                placeholderText="Click to choose date ..."
                // calendarContainer={MyContainer}
              >
                <div style={{ color: "red" }}>
                  Don't forget to check the weather!{" "}
                </div>
              </DatePicker>
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
