import React, { useState } from "react";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import StripeCheckout from "react-stripe-checkout";
import { userPayment } from "../../services/userService";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";

import "./Cottage.css";

const CottageInfo = (props) => {
  const [isPaying, enablePayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { cottagedetails, user } = props;
  console.log("CottageInfo:  ", cottagedetails, user);
  /**
   *  Handle token
   */

  const handleToken = (token, addresses) => {
    console.log("handleToken: ", token, addresses);
    const product = {
      name: `payment for ${cottagedetails.cottagetype}`,
      price: cottagedetails.costperday,
    };
    userPayment(token, product)
      .then((paymentResult) => {
        if (paymentResult.error) {
          setErrorMessage(paymentResult.error);
        } else {
          console.log(" Payment success ....  ");
          props.bookCottage(cottagedetails._id);
        }
      })
      .catch((error) => {
        console.log("userPayment:", error);
        setErrorMessage(error);
      });
  };

  return (
    <div className="container">
      <div className="cottage-layout">
        {errorMessage !== "" && (
          <ResortzyAlert message={errorMessage} style={"danger"} />
        )}
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
              clickapi={() => enablePayment(true)}
              // clickapi={() => props.bookCottage(cottagedetails._id)}
              btntext="Book"
            />
            <br />
            {isPaying && (
              <StripeCheckout
                token={handleToken}
                stripeKey={process.env.REACT_APP_PAYMENT_PUBLIC_KEY}
                email={user.email}
                // amount={cottagedetails.costperday * 100}
              />
            )}
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
