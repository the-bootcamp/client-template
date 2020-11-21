import axios from "axios";

/**
 * create base url for axios
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/**
 *  Edit profile
 * @param {*} editInfo
 * @param {*} token
 */
export const updateuser = (editInfo, token) => {
  const headers = {
    accessToken: token,
  };
  return service
    .post("user/edit", editInfo, { headers })
    .then((editResp) => editResp.data)
    .catch((error) => console.log(error));
};

/**
 *
 * @param {*} email
 */
export const addSubscriber = (email) => {
  return service
    .post(`user/subscribe/${email}`)
    .then((subscribeResp) => subscribeResp.data)
    .catch((error) => console.log(error));
};

export const userPayment = (token, product) => {
  // const product = { name: " soap", price: 200 };
  return service
    .post("user/payment", { token, product })
    .then((loginResp) => loginResp.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
