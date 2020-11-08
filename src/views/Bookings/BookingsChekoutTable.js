import React, { useState, useEffect } from "react";

function BookingsChekoutTable(props) {
  const [openBookings, setOpenbookings] = useState(props.openBookings);

  useEffect(() => {
    setOpenbookings(props.openBookings);
  });

  useEffect(() => {
    setOpenbookings(props.openBookings);
  }, [props.openBookings]);

  let tableBody = (
    <tbody>
      {openBookings &&
        openBookings.length > 0 &&
        openBookings.map((booking) => (
          <tr key={booking._id}>
            <td> {new Date(booking.checkindate).toDateString()} </td>
            <td> {new Date(booking.checkoutdate).toDateString()}</td>
            <td> {new Date(booking.bookingdate).toDateString()} </td>
            <td>
              <select
                name="bookingstatus"
                value={booking.bookingstatus}
                onChange={(evt) =>
                  props.changeBookingStatusState(evt, booking._id)
                }
              >
                <option key={"open" + booking._id} value="open">
                  open
                </option>
                <option key={"cancel" + booking._id} value="cancel">
                  cancel
                </option>
                {/* can CheckOutDate  */}
                {new Date(booking.checkoutdate) < new Date() && (
                  <option key={"close" + booking._id} value="close">
                    close
                  </option>
                )}
              </select>
              <button
                onClick={(evt) => props.updateBookingStatus(evt, booking._id)}
                disabled={booking.bookingstatus === "open"}
              >
                OK
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );

  const tableHeader = (
    <thead className="thead-light text-center">
      <tr>
        <th scope="col"> Check-In Date</th>
        <th scope="col"> Check-out Date</th>
        <th scope="col"> Booking Date</th>
        <th scope="col"> Booking Status </th>
      </tr>
    </thead>
  );

  return (
    <div>
      <table className="table">
        {tableHeader}
        {tableBody}
      </table>
    </div>
  );
}

export default BookingsChekoutTable;
