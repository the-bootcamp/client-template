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
// export const uploadCottagePictures = (imagesList, token) => {
//   console.log("cottageservice -> uploadCottagePictures", imagesList);
//   const uploadpictures = new FormData();
//   const headers = {
//     accessToken: token,
//   };
//   for (let image of imagesList) {
//     uploadpictures.append("cottageimages", image);
//   }
//   return service
//     .post("cottage/upload", uploadpictures, { headers })
//     .then((response) => {
//       console.log("Response from file upload: ", response);
//       return response.data;
//     })
//     .catch(console.error);
// };

export const uploadCottagePictures = (
  imagesList,
  token,
  { onUploadProgress }
) => {
  const uploadpictures = new FormData();
  const headers = {
    accessToken: token,
  };
  const config = {
    headers: {
      accessToken: token,
    },
    onUploadProgress: (progressEvt) => {
      const { loaded, total } = progressEvt;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) onUploadProgress(percent);
    },
  };
  for (let image of imagesList) {
    uploadpictures.append("cottageimages", image);
  }
  return service
    .post("cottage/upload", uploadpictures, config)
    .then((response) => {
      onUploadProgress(100);
      return response.data;
    })
    .catch(console.error);
};

/**
 *  create a new cottage
 * @param {*} cottageInfo
 * @param {*} token
 */
export const addNewCottage = (cottageInfo, token) => {
  // console.log("cottageservice -> uploadCottagePictures", cottageInfo);
  const headers = {
    accessToken: token,
  };
  return service
    .post("cottage/new", cottageInfo, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 * remove a cottage ( from the type os cottages)
 * @param {*} id
 * @param {*} token
 */
export const removeSingleCottage = (id, token) => {
  // console.log("cottageservice -> removeCottage", id);
  const headers = {
    accessToken: token,
  };
  return service
    .delete(`cottage/deleteNum/${id}`, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 * remove a cottage ( from the type os cottages)
 * @param {*} id
 * @param {*} token
 */
export const deleteCottageCategeory = (id, token) => {
  // console.log("cottageservice -> deleteCottageCategeory", id);
  const headers = {
    accessToken: token,
  };
  return service
    .delete(`cottage/deleteCategory/${id}`, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

export const removeCottageImg = () => {
  // console.log("cottageservice -> removeCottageImg");
  // const headers = {
  //   accessToken: token,
  // };
  return service
    .delete(`cottage/deletePicture`)
    .then((response) => response.data)
    .catch(console.error);
};

/**
 *  get all cottages
 *
 * @param {*} token
 */
export const getallCottages = (token) => {
  // console.log("cottageservice -> getallCottages");
  const headers = {
    accessToken: token,
  };
  return service
    .get("cottage/all", { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 * update cottage details
 * @param {*} cottageInfo
 * @param {*} token
 */
export const updateCottageInfo = (id, cottageInfo, token) => {
  // console.log("cottageservice -> updateCottageInfo", cottageInfo);
  const headers = {
    accessToken: token,
  };
  return service
    .post(`cottage/update/${id}`, cottageInfo, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 *
 * @param {*} searchDetails
 * @param {*} token
 */
export const searchAvailabilty = (searchDetails, token) => {
  // console.log("cottageservice -> searchAvailabilty", searchDetails);
  const headers = {
    accessToken: token,
  };
  return service
    .post(`cottage/search`, searchDetails, { headers })
    .then((response) => response.data)
    .catch(console.error);
};

/**
 *
 * @param {*} cottagetype
 * @param {*} token
 */
export const getCottageDetails = (cottagetype, token) => {
  // console.log("cottageservice -> getCottageDetails", cottagetype);
  const headers = {
    accessToken: token,
  };
  return service
    .get(`cottage/get/${cottagetype}`, { headers })
    .then((response) => response.data)
    .catch(console.error);
};
