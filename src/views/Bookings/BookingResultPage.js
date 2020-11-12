import React, { useContext } from "react";
import CottageInfo from "./../cottages/CottageInfo";

// import { useBookingInfo } from "./BookingData";

export const BookingResultPage = ({
  bookingResult: { bookgRes, cottageinfo },
  user,
}) => {
  // console.log("Booking result page: ", bookgRes, cottageinfo, user);
  // const { bookingInfo, setBookingInfo } = useBookingInfo();

  return (
    <div>
      <CottageInfo
        user={user}
        cottagedetails={cottageinfo}
        bookingResult={bookgRes}
      />
    </div>
  );
};
