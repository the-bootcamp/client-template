import React, { useState } from "react";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import StripeCheckout from "react-stripe-checkout";
import { userPayment } from "../../services/userService";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";

import "./Cottage.css";

const CottageInfo = ({ bookCottage, user, cottagedetails, bookingResult }) => {
  const [isPaying, enablePayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  /**
   *  Handle token
   */

  const handleToken = (token, addresses) => {
    const product = {
      name: `payment for ${cottagedetails.cottagetype}`,
      price: cottagedetails.costperday,
    };
    userPayment(token, product)
      .then((paymentResult) => {
        if (paymentResult.failure) {
          setErrorMessage(paymentResult.error);
        } else {
          bookCottage(cottagedetails._id);
        }
      })
      .catch((error) => {
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
          {bookCottage ? (
            <h2> Cottages availability </h2>
          ) : (
            <h2> Booking Result </h2>
          )}
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
            {bookCottage && (
              <p>
                You are entitled to book {cottagedetails.cottagetype} cottages{" "}
              </p>
            )}
            <p> Cost per day and Night:{cottagedetails.costperday} € </p>
            {bookCottage && (
              <div>
                <p> {cottagedetails.description} </p>
                <ResortzyButton
                  style="membership-btn"
                  clickapi={() => enablePayment(true)}
                  // clickapi={() => bookCottage(cottagedetails._id)}
                  btntext="Book"
                />
              </div>
            )}
            {bookingResult && (
              <div>
                <h5> Booking Details </h5>
                <p>
                  Cottage Number: {cottagedetails.cottagetype}-
                  {bookingResult.cottageNumber}
                </p>
                <p> {bookingResult.cottageId.description} </p>
                <p>
                  Booking Date:{" "}
                  {new Date(bookingResult.bookingdate).toDateString()}{" "}
                </p>
                <p>
                  Check-in Date:{" "}
                  {new Date(bookingResult.checkindate).toDateString()}{" "}
                </p>
                <p>
                  Check-Out Date:{" "}
                  {new Date(bookingResult.checkoutdate).toDateString()}
                </p>
              </div>
            )}
            <br />
            {isPaying && (
              <StripeCheckout
                token={handleToken}
                stripeKey={process.env.REACT_APP_PAYMENT_PUBLIC_KEY}
                email={user.email}
                amount={cottagedetails.costperday * 100}
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
