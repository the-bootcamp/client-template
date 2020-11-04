import React, { Component } from "react";
import {
  getCutomerBookings,
  // canceltheBooking,
  changeBookingStatus,
  updateBookingDates,
} from "../../services/bookingService";
import BookingDetails from "./BookingDetails";

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
          const { bookingsList } = bookingsListResp;
          this.setState({ bookingsList });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getCutomerBookings("open", localStorage.getItem("accessToken"))
        .then((bookingsListResp) => {
          console.log(bookingsListResp);
          const { bookingsList } = bookingsListResp;
          this.setState({ bookingsList });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /***
   */
  updateBooking = (checkin, checkout, bookingId) => {
    console.log(" ^^^^^^^^^^^^^^^^ ^^^^^^^^^ ");
    console.log(
      " ListBookings -> updateBooking -> clicked ... ",
      checkin,
      checkout,
      bookingId
    );
    updateBookingDates(
      bookingId,
      checkin,
      checkout,
      localStorage.getItem("accessToken")
    )
      .then((updatedResult) => {
        console.log(" ################# ");

        console.log(" updated response from serer: ");
        if (!updatedResult.success) {
          return console.log(updatedResult);
        }
        const { updatedbooking } = updatedResult;
        let bookingsList = [...this.state.bookingsList];

        bookingsList = bookingsList.map((ele) => ({
          ...ele,
          checkindate:
            updatedbooking._id === ele._id
              ? updatedbooking.checkindate
              : ele.checkindate,
          checkoutdate:
            updatedbooking._id === ele._id
              ? updatedbooking.checkoutdate
              : ele.checkoutdate,
        }));
        console.log(bookingsList);
        this.setState({ bookingsList });
      })
      .catch((error) => console.log(error));
  };

  /**
   *
   * @param {*} bookingId
   */
  cancelBooking = (bookingId) => {
    console.log("ListBookings.js -> cancelBooking:  ", bookingId);
    changeBookingStatus(
      bookingId,
      "cancel",
      localStorage.getItem("accessToken")
    )
      .then((cancelResult) => {
        if (!cancelResult.success) {
          return console.log(cancelResult);
        }
        const { updatedbooking } = cancelResult;
        let bookingsList = [...this.state.bookingsList];

        bookingsList = bookingsList.map((ele) => ({
          ...ele,
          bookingstatus:
            updatedbooking._id === ele._id
              ? updatedbooking.bookingstatus
              : ele.bookingstatus,
        }));

        this.setState({ bookingsList });
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
        <BookingDetails
          key={booking._id}
          bookingInfo={booking}
          cancelBooking={this.cancelBooking}
          updateBooking={this.updateBooking}
        />
      ));
    }
    return <div>{bookingsTable}</div>;
  }
}

export default ListBookings;

// OLD method:
// cancelBooking = (bookingId) => {
//   canceltheBooking(bookingId, localStorage.getItem("accessToken"))
//     .then((cancelResult) => {
//       const { updatedbooking: cancelledBooking } = cancelResult;

//       let bookingsList = this.state.bookingsList;
//       bookingsList = bookingsList.map((booking) =>
//         booking._id === cancelledBooking._id ? cancelledBooking : booking
//       );
//       this.setState({ bookingsList });
//     })
//     .catch((error) => console.log(error));
// };
