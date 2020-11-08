import React, { useState, useEffect } from "react";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import ResortzyImage from "../../components/resortzy-ui/ResortzyImage";
import { uploadCottagePictures } from "../../services/cottageService";
import { ProgressBar } from "react-bootstrap";

const CottageCategory = (props) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [cottagedetails, setcottagedetails] = useState({
    ...props.cottagedetails,
  });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [newFacility, setNewFacility] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * service call to upload cottage images to cloudinary
   */
  const onImageUpload = (e) => {
    // if (e.target.files.length > 4) {
    //   setErrorMessage("One can upload a maz. of 4 images at instance");
    //   return;
    // }
    uploadCottagePictures(e.target.files, localStorage.getItem("accessToken"), {
      onUploadProgress: setUploadPercentage,
    }).then((cottageimages) => {
      setUploadPercentage(0);
      if (cottageimages) {
        console.log(" Response from UPLOAD: ", cottageimages);
        cottageimages.forEach((image) =>
          cottagedetails.cottageimages.push(image)
        );

        setcottagedetails({
          ...cottagedetails,
          cottageimages: cottagedetails.cottageimages,
        });
      }
    });
  };

  //
  useEffect(() => {
    setcottagedetails(props.cottagedetails);
  }, [props.cottagedetails]);

  console.log(" CottageCategory => cottageToEdit: ", cottagedetails);

  return (
    <div>
      {!showEditDialog && (
        <div className="container">
          <div className="cottage-category">
            <h2> Cottage Type: {cottagedetails.cottagetype} </h2>
            <div className="row">
              <div className="col p-2">
                <h6> Cottage Facilities </h6>
                <ul>
                  {cottagedetails.facilities && (
                    <div>
                      {cottagedetails.facilities.map((facility, idx) => (
                        <li key={idx}> {facility} </li>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
            </div>

            <div className="row">
              {cottagedetails.cottageimages.map((picture, idx) => (
                <div className="col-sm-4" key={idx}>
                  <ResortzyImage
                    style="cottage-img d-block w-100"
                    imglink={picture}
                    showClose={false}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="row p-3 m-3 border border-warning">
              <div className="col-sm-6 text-left ">
                <h6 className="col"> Cost per day and Night: </h6>
                <p className="col"> {cottagedetails.costperday} € </p>
              </div>
              <h6 className="col">
                Total Cottages:
                <span className="col">
                  {cottagedetails.totalcottages.length}
                </span>
              </h6>

              <div className="text-center">
                <p> {cottagedetails.description} </p>

                <ResortzyButton
                  btntext="Edit"
                  style="membership-btn"
                  clickapi={() => setShowEditDialog(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  start of EDIT  */}
      {showEditDialog && (
        <div className="container ">
          <div className="cottage-category-edit">
            <h2> Cottage Type: {cottagedetails.cottagetype} </h2>
            <div className="row">
              <div className="col p-2">
                <h6> Cottage Facilities </h6>
                <ul>
                  {cottagedetails.facilities && (
                    <div>
                      {cottagedetails.facilities.map((facility, idx) => (
                        <li key={idx}>
                          <button
                            className="facility-del-btn"
                            onClick={(e) => {
                              cottagedetails.facilities.splice(idx, 1);
                              setcottagedetails({
                                ...cottagedetails,
                                facilities: cottagedetails.facilities,
                              });
                            }}
                          >
                            X{" "}
                          </button>
                          {facility}
                        </li>
                      ))}
                    </div>
                  )}
                  <li>
                    {/* Input text and  Button to add extra Faciities */}
                    <div>
                      <label> New Amenity: </label>
                      <input
                        className="form-control w-10"
                        type="text"
                        name={newFacility}
                        value={newFacility}
                        onChange={(e) => setNewFacility(e.target.value)}
                      />

                      <ResortzyButton
                        btntext="+"
                        style="membership-btn m-2"
                        clickapi={(e) => {
                          cottagedetails.facilities.push(newFacility);
                          setcottagedetails({
                            ...cottagedetails,
                            facilities: cottagedetails.facilities,
                          });
                        }}
                      />
                    </div>
                    {/*  end of new amenity */}{" "}
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              {cottagedetails.cottageimages.map((picture, idx) => (
                <div className="col-sm-4" key={idx}>
                  <ResortzyImage
                    className="cottage-img d-block w-100"
                    imglink={picture}
                    showClose={true}
                    deleteImg={(e) => {
                      cottagedetails.cottageimages.splice(idx, 1);
                      setcottagedetails({
                        ...cottagedetails,
                        cottageimages: cottagedetails.cottageimages,
                      });
                    }}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="row file-upload">
              {/*  DIV : uploading  a new cottage picture */}
              <form className="text-center" autoComplete="off">
                <label>
                  <input
                    className="form-control"
                    type="file"
                    name="cottageimage"
                    multiple
                    onChange={(e) => onImageUpload(e)}
                  />
                  {uploadPercentage > 0 && (
                    <ProgressBar
                      now={uploadPercentage}
                      label={`${uploadPercentage}%`}
                      srOnly
                    />
                  )}
                  <i className="fa fa-cloud-upload"></i> upload
                </label>
              </form>
              {/*  End of Image upload  */}
            </div>

            <div className="m-3 form-inline border border-warning">
              <div className="col">
                <div className="form-group">
                  <h6> Cost per day and Night: </h6>
                  <input
                    className="input-small form-control"
                    type="number"
                    name={cottagedetails.costperday}
                    value={cottagedetails.costperday}
                    onChange={(e) =>
                      setcottagedetails({
                        ...cottagedetails,
                        costperday: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="m-3 form-group">
                  <h6>
                    Total Cottages:
                    <span className="m-2">
                      {cottagedetails.totalcottages.length}
                    </span>
                  </h6>
                  <ResortzyButton
                    // btntext="◅ Add cottages"
                    btntext="+"
                    style="membership-btn m-2"
                    clickapi={(e) => {
                      cottagedetails.totalcottages.push(
                        cottagedetails.totalcottages.length
                      );
                      setcottagedetails({
                        ...cottagedetails,
                        totalcottages: cottagedetails.totalcottages,
                      });
                    }}
                    // clickapi={() => incrementCottageCnt(cottagedetails._id)}
                  />
                </div>
              </div>

              <div className="col">
                <h6> Description: </h6>
                <textarea
                  rows="4"
                  cols="50"
                  name={cottagedetails.description}
                  value={cottagedetails.description}
                  onChange={(e) =>
                    setcottagedetails({
                      ...cottagedetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            <ResortzyButton
              btntext="Update"
              style="membership-btn text-center"
              clickapi={() => {
                props.updateCottageDetails(cottagedetails);
                setShowEditDialog(false);
              }}
            />
          </div>
        </div>
      )}
      {/*  End of Edit part */}
    </div>
  );
};

export default CottageCategory;

/**

return (
    <div>
      
 
      {showEditDialog && <div className="container">
      
        
          <div className="cottage-category">
            <h2> Cottage Type: {cottagedetails.cottagetype} </h2>
            <div className="row">
              <div className="col p-2">
                <h6> Cottage Facilities </h6>
                <ul>
                  {cottagedetails.facilities && (
                    <div>
                      {cottagedetails.facilities.map((facility, idx) => (
                        <li key={idx}> {facility} </li>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
            </div>
        </div>}
 
    </div>
 
 ); */
