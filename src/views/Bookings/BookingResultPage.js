import React, { useContext, useEffect } from "react";
import CottageInfo from "./../cottages/CottageInfo";
import { BookingContext } from "./BookingStore";

import html2PDF from "jspdf-html2canvas";

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
        <div id="book-ticket">
          <CottageInfo
            user={user}
            cottagedetails={cottageinfo}
            bookingResult={bookingInfo}
          />
        </div>
      );
    } else {
      return <> </>;
    }
  };

  const generatePDF = () => {
    html2PDF(document.getElementById("book-ticket"), {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: "./pdf/generate.pdf",
    });
  };

  return (
    <div>
      {/* <button onClick={() => generatePDF()}> Generate PDF </button> */}
      {renderBookPage()}
      {/* <CottageInfo
        user={user}
        cottagedetails={cottageinfo}
        bookingResult={bookingInfo}
      /> */}
    </div>
  );
};
