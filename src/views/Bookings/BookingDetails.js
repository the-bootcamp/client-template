import React, { useState, useEffect } from "react";
import "./Bookings.css";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import ResortzyImage from "../../components/resortzy-ui/ResortzyImage";

import EditBooking from "./EditBooking";

const BookingDetails = ({ bookingInfo, cancelBooking, updateBooking }) => {
  const [showEditDialog, enableEditDialog] = useState(false);
  const [cancelConfirm, showCancelConfirm] = useState(false);

  return (
    <div className="booking-info row">
      {cancelBooking && (
        <div className="col-sm-5">
          <div className="row">
            {bookingInfo.cottageId.cottageimages
              .slice(0, 3)
              .map((picture, idx) => (
                <div key={idx}>
                  <ResortzyImage
                    style="cottage-img"
                    imglink={picture}
                    showClose={false}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      )}

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
          {cancelBooking &&
            bookingInfo.bookingstatus.trim() === "open" &&
            new Date(bookingInfo.checkoutdate) > new Date() && (
              <>
                <ResortzyButton
                  style="membership-btn"
                  // clickapi={() => cancelBooking(bookingInfo._id)}
                  clickapi={() => showCancelConfirm(true)}
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
          {/* <p> {console.log(showEditDialog)} </p> */}
          {bookingInfo.bookingstatus.trim() === "open" && showEditDialog && (
            <EditBooking
              bookingInfo={bookingInfo}
              updateBooking={updateBooking}
              closeEditDialog={() => enableEditDialog(false)}
            />
          )}
        </div>
        {cancelConfirm && (
          <div className="cancel-dialog">
            <p> Do you want to cancel the Booking? </p>
            <ResortzyButton
              style="membership-btn"
              clickapi={() => showCancelConfirm(false)}
              btntext="No"
            />
            <ResortzyButton
              style="membership-btn"
              clickapi={() => {
                showCancelConfirm(false);
                cancelBooking(bookingInfo._id);
              }}
              btntext="Yes"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
