import React from "react";
import "./Bookings.css";
const BookingDetails = (props) => {
  console.log(" BookingDetails: ", props);
  const { bookingInfo } = props;

  return (
    <div className="booking-info">
      <p> Booking Date: {new Date(bookingInfo.bookingdate).toDateString()} </p>
      <h5> Status: {bookingInfo.bookingstatus} </h5>
      <p> Check-in Date: {new Date(bookingInfo.checkindate).toDateString()} </p>
      <p>
        Check-Out Date: {new Date(bookingInfo.checkoutdate).toDateString()}{" "}
      </p>

      <img src={bookingInfo.cottageId.cottageimages[0]} alt="" />
      {bookingInfo.cottageId.cottagetype}
    </div>
  );
};

export default BookingDetails;

/**
bookingdate: "2020-11-03T18:24:43.458Z"
bookingstatus: "open"
checkindate: "2020-11-11T23:00:00.000Z"
checkoutdate: "2020-11-11T23:00:00.000Z"
cottageId:
costperday: 80
cottageimages: (6) ["https://res.cloudinary.com/dqnzc4mlz/image/upload/…esortzy-cottage-pictures/yu2tzsycskboa6prsvor.jpg", "https://res.cloudinary.com/dqnzc4mlz/image/upload/…esortzy-cottage-pictures/ok27viqqm5b6xczaumhr.jpg", "https://res.cloudinary.com/dqnzc4mlz/image/upload/…esortzy-cottage-pictures/rwkt4izqket3dl8ceozo.jpg", "https://res.cloudinary.com/dqnzc4mlz/image/upload/…esortzy-cottage-pictures/py3q6zti3cogooqev5qc.jpg", "https://res.cloudinary.com/dqnzc4mlz/image/upload/…esortzy-cottage-pictures/djbbrfxjqkjl2gaibnxj.jpg", "https://res.cloudinary.com/dqnzc4mlz/image/upload/…esortzy-cottage-pictures/pmg8qhc3beit9tg250uk.jpg"]
cottagetype: "standard"
createdAt: "2020-11-02T09:24:41.211Z"
description: "These are our budget cottges with cmpact rooms andlimited space and storage."
facilities: (13) ["Bath amenities", "Bathrobes & slippers", "2-seater sofa", "2 arm chairs", "mini TV", "Alarm clock", "2-chair Dining table", "Electirc cooker (2-burner)", "coffee machine", "Kettle", "Kitchen utensils", "Refrigerator", "wardrobes"]
totalcottages: (3) [1, 2, 3]
updatedAt: "2020-11-02T09:31:15.038Z"
__v: 3
_id: "5f9fd059297922061372dd5f"
__proto__: Object
cottageNumber: 1
 */
