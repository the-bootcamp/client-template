import React, { useContext } from "react";
import CottageInfo from "./../cottages/CottageInfo";

import { BookingContext } from "./BookingStore";

export const BookingResultPage = ({ user }) => {
  const { bookingInfo, cottageinfo } = useContext(BookingContext);
  //  console.log(
  //   "Booking result page: -> booking info from global store ",
  //   bookingInfo
  // );
  // console.log(
  //   "Booking result page: -> cottageinfo from global store ",
  //   cottageinfo
  // );

  return (
    <div>
      <CottageInfo
        user={user}
        cottagedetails={cottageinfo}
        bookingResult={bookingInfo}
      />
    </div>
  );
};
