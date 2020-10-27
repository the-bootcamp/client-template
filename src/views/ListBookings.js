import React, { Component } from "react";
import {
  getCutomerBookings,
  canceltheBooking,
} from "../services/bookingService";

class ListBookings extends Component {
  state = {
    bookingsList: [],
  };
  /**
   *
   */
  componentDidMount = () => {
    if (this.props.listAll) {
      getCutomerBookings("all", localStorage.getItem("accessToken"))
        .then((bookingsListResp) => {
          console.log(bookingsListResp);
          const { bookingsList } = bookingsListResp;
          this.setState({ bookingsList });
        })
        .catch((error) => console.log(error));
    } else {
      getCutomerBookings("open", localStorage.getItem("accessToken"))
        .then((bookingsListResp) => {
          console.log(bookingsListResp);
          const { bookingsList } = bookingsListResp;
          this.setState({ bookingsList });
        })
        .catch((error) => console.log(error));
    }
  };

  cancelBooking = (bookingId) => {
    console.log("cancelBooking", bookingId);
    canceltheBooking(bookingId, localStorage.getItem("accessToken"))
      .then((bookingsListResp) => {
        console.log(bookingsListResp);
        // const { bookingsList } = bookingsListResp;
        // this.setState({ bookingsList });
      })
      .catch((error) => console.log(error));
  };

  /**
   *
   */
  render() {
    console.log(" ListBookings -- render() => ", this.state);
    let bookingsTable = "";
    if (this.state.bookingsList) {
      bookingsTable = this.state.bookingsList.map((booking) => (
        <tr key={booking._id}>
          <td> {booking.checkindate} </td>
          <td> {booking.checkoutdate}</td>
          <td> {booking.bookingdate} </td>
          <td>{booking.cottageId.cottagetype} </td>
          <td>{booking.cottageNumber} </td>
          <td>{booking.bookingstatus} </td>
          {booking.bookingstatus.trim() === "open" && (
            <td>
              <button onClick={() => this.cancelBooking(booking._id)}>
                Cancel
              </button>
            </td>
          )}
        </tr>
      ));
    }
    return (
      <div>
        <table className="table">
          <thead className="thead-light text-center">
            <tr>
              <th scope="col"> Check-In Date</th>
              <th scope="col"> Check-out Date</th>
              <th scope="col"> Booking Date</th>
              <th scope="col"> Cottage Type</th>
              <th scope="col">Cottage Number </th>
              <th scope="col"> Booking Status </th>
            </tr>
          </thead>
          <tbody>{bookingsTable}</tbody>
        </table>
      </div>
    );
  }
}

export default ListBookings;
