import React from "react";

const CottageInfo = (props) => {
  const { cottagedetails } = props;
  console.log("CottageInfo:  ", cottagedetails);
  return (
    <div>
      <p> {cottagedetails.cottagetype} </p>
      <p> Cost per day and Night:{cottagedetails.costperday} € </p>
      <p> {cottagedetails.description} </p>
      {cottagedetails.cottageimages && (
        <div>
          {cottagedetails.cottageimages.map((picture, idx) => (
            <img key={idx} src={picture} alt="" />
          ))}
        </div>
      )}

      {cottagedetails.facilities && (
        <div>
          <h4> Facilities: </h4>
          {cottagedetails.facilities.map((facility, idx) => (
            <p key={idx}> {facility} </p>
          ))}
        </div>
      )}
      <button onClick={props.bookCottage}> Book </button>
    </div>
  );
};

export default CottageInfo;

// import React, { Component } from "react";
// import AddCottage from "./AddCottage";

// class CottageInfo extends Component {
//   state = {};

//   render() {
//     return <div></div>;
//   }
// }

// export default CottageInfo;
