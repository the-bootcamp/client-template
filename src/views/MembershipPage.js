import React from "react";
import { updateuser } from "./../services/userService";
// import { Redirect } from "react-router-dom";

const membershipPage = (props) => {
  const updateMembership = (membership) => {
    // evt.preventDefault();
    updateuser({ membership }, localStorage.getItem("accessToken"))
      .then((updatedResult) => {
        console.log(" updated membership result: ");
        console.log(updatedResult);
        updatedResult
          ? props.history.push("/")
          : console.log("error in choosing ");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <button onClick={() => updateMembership("silver")}>Silver</button>
        <button onClick={() => updateMembership("gold")}>Gold</button>
        <button onClick={() => updateMembership("platinum")}>Platinum</button>
      </div>
    </div>
  );
};

export default membershipPage;
