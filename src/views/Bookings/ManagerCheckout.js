import React, { Component } from "react";
import {
  changeBookingStatus,
  searchOpenBookings,
} from "../../services/bookingService";
import { getallCottages } from "../../services/cottageService";

class ManagerCheckout extends Component {
  state = {
    bookingsForCheckout: [],
    category: "",
    cottageNumber: "",
    arrayCottages: [],
    arrayRoomsNums: [],
    errorMessage: "",
  };

  /**
   *
   */
  componentDidMount = () => {
    getallCottages(localStorage.getItem("accessToken")).then(
      (cottagesResponse) => {
        if (cottagesResponse) {
          const arrayCottages = cottagesResponse.allCottages;
          this.setState({ arrayCottages });
        }
      }
    );
  };

  /**
   *
   * @param {*} evt
   */
  handleCategoryChange = (evt) => {
    if (evt.target.name === "category") {
      this.setState({
        [evt.target.name]: evt.target.value,
        arrayRoomsNums: this.state.arrayCottages
          .filter((ele) => ele.cottagetype === evt.target.value)
          .map((ele) => ele.totalcottages)[0],
      });
    } else if (evt.target.name === "cottageNumber") {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }
  };

  /**
   *
   */
  searchBookings = (evt) => {
    evt.preventDefault();
    if (!this.state.category || !this.state.cottageNumber) {
      this.setState({
        errorMessage: "Choose Valid Cottage category and Cottage Number ",
      });
      return;
    }
    searchOpenBookings(
      this.state.category,
      this.state.cottageNumber,
      localStorage.getItem("accessToken")
    )
      .then((response) => {
        console.log(response);
        const { bookingsFound } = response;
        this.setState({ bookingsForCheckout: bookingsFound });
      })
      .catch((error) => console.log(error));
  };

  /**
   *
   * @param {*} event
   * @param {*} id
   */
  changeBookingStatus = (event, id) => {
    console.log(
      " ManagerCheckout.js ==> changeBookingStatus(): ",
      id,
      event.target.value
    );

    // console.log(event.target.name, " --- ", event.target.value);
    const bookingsForCheckout = this.state.bookingsForCheckout.map((ele) =>
      ele._id === id ? { ...ele, bookingstatus: event.target.value } : ele
    );
    this.setState({ bookingsForCheckout });
  };

  updateBookingStatus = (event, bookId) => {
    event.preventDefault();
    console.log("updateBookingStatus clicked ....  ");

    const newStatus = this.state.bookingsForCheckoutx
      .filter((ele) => ele._id === bookId)
      .map(({ bookingstatus }) => bookingstatus)[0];

    changeBookingStatus(bookId, newStatus, localStorage.getItem("accessToken"))
      .then((response) => {
        // console.log(response.updatedbooking);
        if (response.success) {
          let bookingsForCheckout = this.state.bookingsForCheckout;
          bookingsForCheckout = bookingsForCheckout.map((booking) =>
            booking._id === response.updatedbooking._id
              ? response.updatedbooking
              : booking
          );
          this.setState({ bookingsForCheckout });
        }
      })
      .catch((error) => console.log(error));
  };
  /**
   *
   */
  render() {
    console.log(" ManagerCheckout.js ==> render(): ", this.state);
    const {
      category,
      cottageNumber,
      arrayCottages,
      arrayRoomsNums,
      bookingsForCheckout,
      errorMessage,
    } = this.state;

    let categoryDropbox = arrayCottages.map((ele) => (
      <option key={ele._id} value={`${ele.cottagetype}`}>
        {ele.cottagetype}
      </option>
    ));

    let cottagenumbersDropbox = arrayRoomsNums.map((ele) => (
      <option key={ele} value={`${ele}`}>
        {ele}
      </option>
    ));

    let bookingsTable = "";
    let canCheckOutDate = new Date();
    canCheckOutDate.setDate(canCheckOutDate.getDate() + 10);
    console.log(canCheckOutDate);
    if (bookingsForCheckout && bookingsForCheckout.length > 0) {
      bookingsTable = bookingsForCheckout.map((booking) => (
        <tr key={booking._id}>
          <td> {new Date(booking.checkindate).toDateString()} </td>
          <td> {new Date(booking.checkoutdate).toDateString()}</td>
          <td> {new Date(booking.bookingdate).toDateString()} </td>
          {/* <td>{booking.cottageId.cottagetype} </td> */}
          {/* <td>{booking.cottageNumber}</td> */}

          <td>
            <select
              name="bookingstatus"
              value={booking.bookingstatus}
              onChange={(evt) => this.changeBookingStatus(evt, booking._id)}
            >
              <option key={"open" + booking._id} value="open">
                open
              </option>
              <option key={"cancel" + booking._id} value="cancel">
                cancel
              </option>
              {new Date(booking.checkoutdate) <= canCheckOutDate && (
                <option key={"close" + booking._id} value="close">
                  close
                </option>
              )}
            </select>
            <button
              onClick={(evt) => this.updateBookingStatus(evt, booking._id)}
              disabled={booking.bookingstatus === "open"}
            >
              OK
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form autoComplete="off" onSubmit={this.searchBookings}>
          <div className="form-group">
            <label>Choose cottage categeory : </label>
            <select
              value={category}
              name="category"
              className="form-control"
              onChange={this.handleCategoryChange}
            >
              <option value="">none</option>
              {categoryDropbox}
            </select>
          </div>

          <div className="form-group">
            <label>Choose cottage Number : </label>
            <select
              value={cottageNumber}
              name="cottageNumber"
              className="form-control"
              onChange={this.handleCategoryChange}
            >
              <option value="">none</option>
              {cottagenumbersDropbox}
            </select>
            <button
              type="submit"
              className="btn btn-primary  justify-content-center"
            >
              Search Bookings
            </button>
          </div>
        </form>

        {bookingsForCheckout.length > 0 && (
          <div>
            <div>
              <h5> Cottage Categeory: {category} </h5>
              <h5> Cottage Number: {cottageNumber} </h5>
            </div>
            <table className="table">
              <thead className="thead-light text-center">
                <tr>
                  <th scope="col"> Check-In Date</th>
                  <th scope="col"> Check-out Date</th>
                  <th scope="col"> Booking Date</th>
                  {/* <th scope="col"> Cottage Type</th>
                  <th scope="col">Cottage Number </th> */}
                  <th scope="col"> Booking Status </th>
                </tr>
              </thead>
              <tbody>{bookingsTable}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default ManagerCheckout;
