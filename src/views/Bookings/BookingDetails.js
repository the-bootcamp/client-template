import React, { useState, useEffect } from "react";
import "./Bookings.css";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import EditBooking from "./EditBooking";

const BookingDetails = (props) => {
  const [showEditDialog, enableEditDialog] = useState(false);

  console.log(" BookingDetails: ", props, showEditDialog);
  const { bookingInfo } = props;

  useEffect(() => {
    enableEditDialog(false);
  }, []);

  return (
    <div className="booking-info row">
      <div className="col-sm-6">
        <img src={bookingInfo.cottageId.cottageimages[0]} alt="" />
      </div>
      <div className="col-sm-6">
        <p>
          Cottage Number: {bookingInfo.cottageId.cottagetype}-
          {bookingInfo.cottageNumber}
        </p>
        <p> {bookingInfo.cottageId.description} </p>
        <p>Booking Date: {new Date(bookingInfo.bookingdate).toDateString()} </p>
        <p>
          Check-in Date: {new Date(bookingInfo.checkindate).toDateString()}{" "}
        </p>
        <p>
          Check-Out Date: {new Date(bookingInfo.checkoutdate).toDateString()}
        </p>
        <div className="row">
          <h5> Status: {bookingInfo.bookingstatus} </h5> &emsp;
          {bookingInfo.bookingstatus.trim() === "open" && (
            <>
              <ResortzyButton
                style="membership-btn"
                clickapi={() => props.cancelBooking(bookingInfo._id)}
                btntext="cancel"
              />
              &emsp;
              <ResortzyButton
                style="membership-btn"
                clickapi={() => enableEditDialog(true)}
                btntext="change"
                disabled={showEditDialog ? true : false}
              />
            </>
          )}
          can show edit dialog: <p> {console.log(showEditDialog)} </p>
          {bookingInfo.bookingstatus.trim() === "open" && showEditDialog && (
            <EditBooking
              bookingInfo={bookingInfo}
              updateBooking={props.updateBooking}
              closeEditDialog={() => enableEditDialog(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
