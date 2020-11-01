import React, { useState, useEffect } from "react";
import { updateuser } from "../../services/userService";
import { getMembershipDetails } from "../../services/membershipService";
import MembershipCard from "../layout/MembershipCard";

function MembershipPage(props) {
  const [membershipList, setMembershipList] = useState([]);

  useEffect(() => {
    getMembershipDetails()
      .then((MshipInfo) => {
        console.log(MshipInfo.membershipInfo);

        setMembershipList(MshipInfo.membershipInfo);
      })
      .catch((error) => console.log(error));

    return () => {
      setMembershipList([]);
    };
  }, []);

  const getCottageCategory = (membershiptype) => {
    return membershipList
      .filter((ele) => ele.membership === membershiptype)
      .map(({ cottagetype }) => cottagetype)[0];
  };

  const updateMembership = (membership) => {
    let defaultcottage = getCottageCategory(membership);
    console.log("MembershipPAge => updateMembership => ", defaultcottage);

    updateuser(
      { membership, defaultcottage },
      localStorage.getItem("accessToken")
    )
      .then((updatedResult) => {
        if (updatedResult) {
          console.log(" updated membership result: ", updatedResult);
          props.authenticate(updatedResult.userInfo);
          props.history.push("/home");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <blockquote>
        Holidays are the best way to bond with your loved ones, and choosing a
        suitable Membership is ideal for it. With membership, you can enjoy
        future holidays at today's prices. Pay once and we promise you the fun
        and happiness to your loved ones.
      </blockquote>
      <h3> CLUB MEMBERSHIP ADVANTAGES </h3>
      <ul>
        <li> Book a vacation in our resort</li>
        <li> Avail our great Aminities and Services </li>
        <li>Accessibility Requests </li>
      </ul>
      <div className="member-layout">
        {membershipList.map((eachMemShip) => (
          <MembershipCard
            eachMemShip={eachMemShip}
            updateMembership={updateMembership}
          />
        ))}
      </div>
    </div>
  );
}

export default MembershipPage;
