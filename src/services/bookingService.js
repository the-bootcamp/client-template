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
