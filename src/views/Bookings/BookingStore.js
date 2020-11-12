import React, { createContext, useState } from "react";

export const BookingContext = createContext({});

const BookingStore = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState({});
  const [cottageinfo, setCottageInfo] = useState({});

  return (
    <BookingContext.Provider
      value={{ bookingInfo, setBookingInfo, cottageinfo, setCottageInfo }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingStore;
