import React, { useState } from "react";
import ResortzyDate from "../../components/resortzy-ui/ResortzyDate";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import "./Bookings.css";

const EditBooking = (props) => {
  console.log("EditBooking ...  ", props);
  const [checkindate, setCheckinDate] = useState(
    new Date(props.bookingInfo.checkindate)
  );
  const [checkoutdate, setCheckoutDate] = useState(
    new Date(props.bookingInfo.checkoutdate)
  );
  // checkOutMinDate
  const [checkOutMinDate, setCheckOutMinDate] = useState(new Date());

  function updateDates(date, origin) {
    if (origin === "checkindate") {
      setCheckinDate(date);
      checkoutdate <= date ? setCheckoutDate(date) : console.log("");
    } else {
      date >= checkindate ? setCheckoutDate(date) : console.log("");
    }
  }

  return (
    <div>
      <div className="form-inline edit-book-form" autoComplete="off">
        <div>
          <button
            className="form-close-btn btn-xs"
            onClick={() => props.closeEditDialog()}
          >
            X
          </button>
          <h6>Change your Booking Date:</h6>
          {/* // check in date */}
          <div className="form-group">
            <label>Check-in Date: </label>
            <ResortzyDate
              name="checkindate"
              initialDate={checkindate}
              minDate={new Date()}
              maxDate={new Date()}
              setDateValue={(date) => updateDates(date, "checkindate")} // setDateValue is the onchange method
            />
          </div>
          &nbsp;
          <div className="form-group mb-2">
            <label>CheckOut Date: </label>
            {/* // check out date */}
            <ResortzyDate
              name="checkoutdate"
              initialDate={checkoutdate}
              minDate={new Date()}
              maxDate={new Date()}
              // mincheckOutDate={checkOutMinDate}
              setDateValue={(date) => updateDates(date, "checkoutdate")}
            />
          </div>
          <ResortzyButton
            style="membership-btn"
            clickapi={() => {
              props.updateBooking(
                checkindate,
                checkoutdate,
                props.bookingInfo._id,
                props.bookingInfo.cottageId.cottagetype
              );
              props.closeEditDialog(false);
            }}
            btntext="Update"
          />
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
