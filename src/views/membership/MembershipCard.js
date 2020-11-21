import React from "react";
import "./Membership.css";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

function MembershipCard({ eachMemShip, showChooseBtn, updateMembership }) {
  return (
    <div className="member-card col">
      <div key={eachMemShip._id}>
        <img className="card-img-top" src={eachMemShip.imgurl} alt="" />
        <div className="card-body">
          <h5 className="card-title">
            Enjoy our <i>{eachMemShip.cottagetype}</i> Cottages
          </h5>
          <p className="card-text"> {eachMemShip.description}</p>
        </div>
        {/* <p>Membership Type: : {eachMemShip.membership} </p> */}
        {/* <p className="card-text">
          <span className="text-muted">
            Membership price: {eachMemShip.costperyear} €
          </span>
        </p> */}
        Benefits
        <ul>
          {eachMemShip.amenities.map((ele, idx) => (
            <li key={idx}> {ele} </li>
          ))}
        </ul>
        {/* <p className="card-text">
          <small className="text-muted">
            Days Free stay: {eachMemShip.daysfreestay} days{" "}
            {eachMemShip.daysfreestay - 1} nights
          </small>
        </p> */}
        {/* <button onClick={() => props.updateMembership(eachMemShip.membership)}>
          Choose
          
        </button> */}
        {showChooseBtn && (
          <div style={{ paddingLeft: "30%" }}>
            <ResortzyButton
              style={"membership-btn"}
              clickapi={() => updateMembership(eachMemShip.membership)}
              btntext="Choose"
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default MembershipCard;
