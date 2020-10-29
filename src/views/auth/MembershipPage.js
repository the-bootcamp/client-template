import React from "react";
import { updateuser } from "../../services/userService";
// import { Redirect } from "react-router-dom";

const membershipPage = (props) => {
  const updateMembership = (membership) => {
    let defaultcottage =
      membership.toLowerCase().trim() === "silver"
        ? "standard"
        : membership.toLowerCase().trim() === "gold"
        ? "classic"
        : "superior";

    updateuser(
      { membership, defaultcottage },
      localStorage.getItem("accessToken")
    )
      .then((updatedResult) => {
        if (updatedResult) {
          props.authenticate(updatedResult.userInfo);
          props.history.push("/home");
        }
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
