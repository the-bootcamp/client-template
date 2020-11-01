import React from "react";

function MembershipCard(props) {
  console.log(props);
  const { eachMemShip } = props;

  return (
    <div className="member-card ">
      <div key={eachMemShip._id}>
        <p>cottage Type : {eachMemShip.cottagetype} </p>
        <p>Membership Type: : {eachMemShip.membership} </p>
        <p>Days Free stay: : {eachMemShip.daysfreestay} </p>
        <p>Cost of membership: : {eachMemShip.costperyear} </p>
        <p>About: : {eachMemShip.description} </p>
        <ul>
          {eachMemShip.amenities.map((ele, idx) => (
            <li key={idx}> {ele} </li>
          ))}
        </ul>
        <button onClick={() => props.updateMembership(eachMemShip.membership)}>
          Choose{" "}
        </button>
      </div>
    </div>
  );
}

export default MembershipCard;
