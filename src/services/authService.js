import axios from "axios";

/**
 * create base url for axios
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/**
 * validate sessionToken
 * @param {*} accessToken
 */
export const validateSession = (accessToken) => {
  return service
    .get(`/auth/validatesession/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};

/**
 * signup service
 * @param {*} param0
 */
export const signup = ({
  username,
  email,
  password,
  address,
  phone,
  userrole,
}) => {
  return service
    .post("/auth/signup", {
      username,
      email,
      password,
      address,
      phone,
      userrole,
    })
    .then((response) => {
      // console.log(" Signup response from axios call: ", response);
      return response.data;
    })
    .catch((err) => err);
};

/**
 * Login
 * @param {*} param0
 */
export const login = ({ email, password }) => {
  return service
    .post("/auth/login", { email, password })
    .then((response) => {
      // console.log("Login response from server:", response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Logout
 * @param {*} accessToken
 */
export const logout = (accessToken) => {
  console.log(" authServices -> logout: ", accessToken);
  return service
    .delete(`auth/logout/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
