import axios from "axios";

/**
 * create base url for axios
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/**
 * get all the membershipdetails
 * @param {*} accessToken
 */
export const getMembershipDetails = (membership) => {
  return service
    .get(`membership/${membership}`)
    .then((response) => response.data)
    .catch((err) => err);
};
