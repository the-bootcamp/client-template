import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext({});

export function BookingData({ children }) {
  const [bookingInfo, setBookingInfo] = useState({});
  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookingInfo = () => useContext(BookingContext);
