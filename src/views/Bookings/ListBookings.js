import React, { Component } from "react";
import {
  getCutomerBookings,
  changeBookingStatus,
  updateBookingDates,
} from "../../services/bookingService";
import { searchAvailabilty } from "../../services/cottageService";
import BookingDetails from "./BookingDetails";

class ListBookings extends Component {
  state = {
    bookingsList: [],
    errorMessage: "",
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
  updateBooking = (checkin, checkout, bookingId, defaultcottage) => {
    console.log(
      " ListBookings -> updateBooking -> clicked ... ",
      checkin,
      checkout,
      defaultcottage
    );
    // ------------------------------
    // Check for availbility of cottages

    searchAvailabilty(
      {
        checkindate: checkin,
        checkoutdate: checkout,
        defaultcottage,
      },
      localStorage.getItem("accessToken")
    ).then((searchRes) => {
      console.log(searchRes);
      if (searchRes && searchRes.cottagesAvailability) {
        console.log(" cottages avaialbe for booking .... ");

        const {
          cottagesFree: [cottageNumber],
        } = searchRes.cottagesAvailability;

        console.log(cottageNumber);
        updateBookingDates(
          bookingId,
          checkin,
          checkout,
          cottageNumber,
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
              cottageNumber:
                updatedbooking._id === ele._id
                  ? updatedbooking.cottageNumber
                  : ele.cottageNumber,
            }));
            console.log(bookingsList);
            this.setState({ bookingsList });
          })
          .catch((error) => console.log(error));
      } else {
        console.log(" cottages not avaialble .....  ", searchRes.error);
        this.setState({ errorMessage: searchRes.error });
      }
    });
    // ----------------------------------------
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
    // console.log(" ListBookings -- render() => ", this.state);
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
