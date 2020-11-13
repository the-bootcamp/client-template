import React, { useContext, useEffect } from "react";
import CottageInfo from "./../cottages/CottageInfo";

import { BookingContext } from "./BookingStore";

export const BookingResultPage = ({ user }) => {
  const {
    bookingInfo,
    setBookingInfo,
    cottageinfo,
    setCottageInfo,
  } = useContext(BookingContext);
  //  console.log(
  //   "Booking result page: -> booking info from global store ",
  //   bookingInfo
  // );
  // console.log(
  //   "Booking result page: -> cottageinfo from global store ",
  //   cottageinfo
  // );

  useEffect(() => {
    console.log("BookingStore -> useEffect called ....  ");
    setBookingInfo(JSON.parse(localStorage.getItem("bookingResult")));
    setCottageInfo(JSON.parse(localStorage.getItem("bookedCottageResult")));
  }, []);

  const renderBookPage = () => {
    if (
      Object.keys(cottageinfo).length > 0 &&
      Object.keys(bookingInfo).length > 0
    ) {
      return (
        <CottageInfo
          user={user}
          cottagedetails={cottageinfo}
          bookingResult={bookingInfo}
        />
      );
    } else {
      return <> </>;
    }
  };

  return (
    <div>
      {renderBookPage()}
      {/* <CottageInfo
        user={user}
        cottagedetails={cottageinfo}
        bookingResult={bookingInfo}
      /> */}
    </div>
  );
};
