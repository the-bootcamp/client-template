import axios from "axios";

/**
 *
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/**
 *
 * @param {*} accessToken
 */
export const validateSession = (accessToken) => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  return service
    .get(`/auth/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};

/**
 * signup service
 * @param {*} param0
 */
export const signup = ({ username, email, password, address, phone }) => {
  return service
    .post("/auth/signup", { username, email, password, address, phone })
    .then((response) => {
      console.log(" Signup response from axios call: ", response);
      return response.data;
    })
    .catch((err) => err);
};

/**
 *
 * @param {*} param0
 */
export const login = ({ email, password }) => {
  return service
    .post("/auth/login", { email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

/**
 *
 * @param {*} accessToken
 */
export const logout = (accessToken) => {
  console.log(" authServices -> logout: ", accessToken);
  return service
    .delete(`auth/logout/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
