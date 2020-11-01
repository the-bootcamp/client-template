import React from "react";
import "./Membership.css";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

function MembershipCard(props) {
  console.log(props);
  const { eachMemShip } = props;

  return (
    <div className="member-card col">
      <div key={eachMemShip._id}>
        <img className="card-img-top" src={eachMemShip.imgurl} alt="" />
        <div class="card-body">
          <h5 class="card-title">
            Enjoy <q>{eachMemShip.cottagetype}</q> Cottages
          </h5>
          <p class="card-text"> {eachMemShip.description}</p>
        </div>

        {/* <p>Membership Type: : {eachMemShip.membership} </p> */}

        <p class="card-text">
          <p class="text-muted">
            Membership price: {eachMemShip.costperyear} €
          </p>
        </p>

        <ul>
          {" "}
          Benefits
          {eachMemShip.amenities.map((ele, idx) => (
            <li key={idx}> {ele} </li>
          ))}
        </ul>
        <p class="card-text">
          <small class="text-muted">
            Days Free stay: {eachMemShip.daysfreestay} days{" "}
            {eachMemShip.daysfreestay - 1} nights
          </small>
        </p>
        {/* <button onClick={() => props.updateMembership(eachMemShip.membership)}>
          Choose
        </button> */}
        <ResortzyButton
          style="membership-btn"
          clickapi={() => props.updateMembership(eachMemShip.membership)}
          btntext="Choose"
        />
      </div>
    </div>
  );
}

export default MembershipCard;
