import React, { useState, useEffect } from "react";
import { updateuser } from "../../services/userService";
import { getMembershipDetails } from "../../services/membershipService";
import MembershipCard from "./MembershipCard";
import "./Membership.css";

function MembershipPage(props) {
  const [membershipList, setMembershipList] = useState([]);

  useEffect(() => {
    getMembershipDetails("all")
      .then((MshipInfo) => {
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

    updateuser(
      // { membership, defaultcottage },
      { membership },
      localStorage.getItem("accessToken")
    )
      .then((updatedResult) => {
        if (updatedResult) {
          props.authenticate(updatedResult.userInfo);
          props.history.push("/signupsuccess");
          // props.history.push("/home");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="member-layout">
      <h2> One Membership. Exclusively Yours. </h2>
      <div className="container">
        <div className="row">
          <div className="col">
            &quot; Holidays are the best way to bond with your loved ones, and
            choosing a suitable Membership is ideal for it. With membership, you
            can enjoy future holidays at today's prices. Pay once and we promise
            you the fun and happiness to your loved ones. &quot;
          </div>
          <div className="col">
            <h3> CLUB MEMBERSHIP ADVANTAGES </h3>

            <ul>
              <li> Book a vacation in our resort</li>
              <li> Avail our great Aminities and Services </li>
              <li> Accessibility Requests </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="member-layout row card-group ">
          {membershipList.map((eachMemShip) => (
            <MembershipCard
              key={eachMemShip._id}
              showChooseBtn={true}
              eachMemShip={eachMemShip}
              updateMembership={updateMembership}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
