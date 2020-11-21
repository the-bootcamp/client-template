import React, { useState, useEffect } from "react";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import { getMembershipDetails } from "../../services/membershipService";
import MembershipCard from "./../membership/MembershipCard";
import "./RegistrationSuccess.css";
function RegistrationSuccess(props) {
  const [membership, setMembership] = useState(null);
  const { user } = props;

  useEffect(() => {
    getMembershipDetails(user.membership)
      .then((MshipInfo) => {
        setMembership(MshipInfo.membershipInfo[0]);
      })
      .catch((error) => console.log(error));

    return () => {
      setMembership({});
    };
  }, []);

  return (
    <div className="reg-success">
      <h2>
        Dear {user.username}, <hr />
      </h2>

      <div className="container">
        <div className="row">
          <p>
            Welcome to RESORTZY!! Your account has been successfully created !!
          </p>
        </div>
      </div>

      <div className=" justify-content-center">
        <div>
          {membership && (
            <div>
              <div className="form-group row">
                <div className="col-md-3"></div>
                <MembershipCard
                  showChooseBtn={false}
                  eachMemShip={membership}
                />
                <div className="col-md-3"></div>
              </div>
              <div className="form-group row">
                <div className="col-md-4"></div>
                <ResortzyButton
                  clickapi={() => props.history.push("/home")}
                  style="btn btn-default  membership-btn "
                  btntext={"Plan your holidays"}
                />
                <div className="col-md-5"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
