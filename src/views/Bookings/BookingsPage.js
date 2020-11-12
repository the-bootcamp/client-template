import React, { useState } from "react";
import CottageInfo from "../cottages/CottageInfo";
import { addABooking } from "../../services/bookingService";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";

// import { useBookingInfo } from "./BookingData";

function BookingsPage(props) {
  // const { bookingInfo, setBookingInfo } = BookingData();
  // const [state, setstate] = useState(props.cottageSearchRes);
  const [errorMessage, setErrorMessage] = useState("");

  /** to book a cottage  */
  const bookCottage = () => {
    const {
      checkindate,
      checkoutdate,
      // user: { _id: userId },
      cottagesFree: [cottageNumber],
      cottagelist: { _id: cottageId },
    } = props.cottageSearchRes;

    const bookingRecord = {
      userId: props.user._id,
      checkindate,
      checkoutdate,
      bookingdate: new Date(),
      cottageId,
      cottageNumber,
      bookingstatus: "open",
    };
    addABooking(bookingRecord, localStorage.getItem("accessToken"))
      .then((bookingRes) => {
        if (bookingRes.success) {
          props.setBookingResult(bookingRes.newBooking, bookingRes.cottageinfo);
          props.history.push("/open-bookings");
        }
        // setBookingInfo(bookingRes.newBooking); // added for usecontext.
      })
      .catch((error) => setErrorMessage(error));
  }; // end bookCottage

  const {
    cottageSearchRes: { cottagelist },
    user,
  } = props;

  return (
    <div>
      {errorMessage !== "" && (
        <ResortzyAlert message={errorMessage} style={"danger"} />
      )}
      <CottageInfo
        bookCottage={bookCottage}
        user={user}
        cottagedetails={cottagelist}
      />
    </div>
  );
}

export default BookingsPage;

// import React, { Component } from "react";
// import { getCottageDetails } from "../../services/cottageService";
// import { addABooking } from "../../services/bookingService";

// class BookingsPage extends Component {
//   state = {
//     searchResult: this.props.cottageSearchRes,
//     cottageInfo: {},
//     bookedResult: {},
//   };

//   componentDidMount = () => {
//     getCottageDetails(
//       this.state.searchResult.cottageType,
//       localStorage.getItem("accessToken")
//     )
//       .then((cottageInfo) => {
//         this.setState({ cottageInfo: cottageInfo.foundCottages });
//       })
//       .catch((error) => console.log(error));
//   };

//   /**
//    *
//    */
//   bookCottage = () => {
//     const booking = {
//       userId: this.props.user._id,
//       checkindate: this.state.searchResult.checkindate,
//       checkoutdate: this.state.searchResult.checkoutdate,
//       bookingdate: new Date(),
//       cottageId: this.state.searchResult.cottageId,
//       cottageNumber: this.state.searchResult.cottagesFree[0],
//       bookingstatus: "open",
//     };

//     addABooking(booking, localStorage.getItem("accessToken"))
//       .then((bookingRes) => {
//         console.log(bookingRes);
//         // this.props.setBookingResult(bookingRes);
//         this.props.setBookingResult();
//         this.props.history.push("/open-bookings");
//       })
//       .catch((error) => console.log(error));
//   };

//   render() {
//     console.log(" BookingPage -- render() => ", this.props);
//     console.log(" BookingPage -- render() => ", this.state);

//     const { cottageInfo } = this.state;
//     return (
//       <div>
//         Booking page welcomes you ...
//         {cottageInfo && <p> {cottageInfo.description} </p>}
//         {/* {cottageInfo &&
//           cottageInfo.cottageimages &&
//           cottageInfo.cottageimages.map((eachImg, idx) => (
//             <img key={idx} src={eachImg} />
//           ))} */}
//         {cottageInfo && cottageInfo.cottageimages && (
//           <img
//             width="50"
//             height="50"
//             src={cottageInfo.cottageimages[0]}
//             alt=""
//           />
//         )}
//         <button onClick={() => this.bookCottage()}> Book Cottage </button>
//       </div>
//     );
//   }
// }

// export default BookingsPage;
