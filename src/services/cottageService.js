import axios from "axios";

/**
 * create base url for axios
 */
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/**
 *  upload cottage images to cloudinary
 * @param {*} imagesList
 * @param {*} token
 */
export const uploadCottagePictures = (imagesList, token) => {
  console.log("cottageservice -> uploadCottagePictures", imagesList.length);
  const uploadpictures = new FormData();
  const headers = {
    accessToken: token,
  };
  for (let image of imagesList) {
    uploadpictures.append("cottageimages", image);
  }
  return service
    .post("cottage/upload", uploadpictures, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 *  create a nre cottage
 * @param {*} cottageInfo
 * @param {*} token
 */
export const addNewCottage = (cottageInfo, token) => {
  console.log("cottageservice -> uploadCottagePictures", cottageInfo);
  const headers = {
    accessToken: token,
  };
  return service
    .post("cottage/new", cottageInfo, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 *  get all cottages
 *
 * @param {*} token
 */
export const getallCottages = (token) => {
  console.log("cottageservice -> getallCottages");
  const headers = {
    accessToken: token,
  };
  return service
    .get("cottage/all", { headers })
    .then((response) => response.data)
    .catch(console.error);
};
