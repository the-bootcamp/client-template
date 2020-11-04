import axios from "axios";

/**
 * create base url for axios
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/**
 * createa booking record
 * @param {*} accessToken
 */
export const addABooking = (bookInfo, accesstoken) => {
  const headers = {
    accesstoken,
  };
  return service
    .post(`booking/new`, bookInfo, { headers })
    .then((response) => response.data)
    .catch((err) => err);
};

/**
 * create a booking record
 * @param {*} accessToken
 */
export const getCutomerBookings = (bookingStatus, token) => {
  const headers = {
    accessToken: token,
  };
  return service
    .get(`booking/getCustomerBookings/${bookingStatus}`, { headers })
    .then((response) => response.data)
    .catch((err) => err);
};

export const updateBookingDates = (id, checkindate, checkoutdate, token) => {
  const headers = {
    accessToken: token,
  };
  let record = { checkindate, checkoutdate };
  return service
    .post(`booking/changeStatus/${id}`, record, { headers })
    .then((response) => response.data)
    .catch((err) => err);
};

/**
 * cancel a booking
 * @param {*} accessToken
 */
export const changeBookingStatus = (id, bookingstatus, token) => {
  const headers = {
    accessToken: token,
  };
  let record = { bookingstatus };
  return service
    .post(`booking/changeStatus/${id}`, record, { headers })
    .then((response) => response.data)
    .catch((err) => err);
};

// export const changeBookingStatus = (id, status, token) => {
//   const headers = {
//     accessToken: token,
//   };

//   return service
//     .post(`booking/changeStatus/${id}`, { status }, { headers })
//     .then((response) => response.data)
//     .catch((err) => err);
// };

/**
 *
 * @param {*} cotegory
 * @param {*} cottageNum
 * @param {*} token
 */
export const searchOpenBookings = (category, cottageNumber, accessToken) => {
  const headers = {
    accessToken,
    cottageNumber,
    category,
  };
  console.log("cottageNumber:", cottageNumber);
  return service
    .get(`booking/searchOpenBookings/`, { headers })
    .then((response) => response.data)
    .catch((err) => err);
};
