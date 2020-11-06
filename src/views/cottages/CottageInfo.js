import React from "react";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

import "./Cottage.css";
const CottageInfo = (props) => {
  const { cottagedetails } = props;
  console.log("CottageInfo:  ", cottagedetails);
  return (
    <div className="container">
      <div className="cottage-layout">
        <div className="row">
          <h2> Cottages availability </h2>
        </div>
        <div className="row cottage-info">
          <div className="col-sm-6">
            <h4> Cottage Facilities </h4>
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
          <div className="col-sm-6 cottage-info-right">
            You are entitled to book {cottagedetails.cottagetype} cottages
            <p> Cost per day and Night:{cottagedetails.costperday} € </p>
            <p> {cottagedetails.description} </p>
            {/* <button onClick={props.bookCottage}> Book </button> */}
            <ResortzyButton
              style="membership-btn"
              clickapi={() => props.bookCottage(cottagedetails._id)}
              btntext="Book"
            />
          </div>
        </div>
        <div className="row">
          {cottagedetails.cottageimages.map((picture, idx) => (
            <div className="col-sm-4" key={idx}>
              <img className="cottage-img d-block w-100" src={picture} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CottageInfo;
