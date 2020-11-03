import React, { useState } from "react";
import "./Layout.css";

function Footer(props) {
  const [signupNewsEmail, setSignUpNews] = useState("");
  const [emailPlaceHolder, setPlaceHolder] = useState("Enter valid emailID ");

  const subscribeNewsLetter = (evt) => {
    // evt.preventDefault();
    console.log(" Footer.js -> subscribeNewsLetter", signupNewsEmail);
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        signupNewsEmail
      )
    ) {
      console.log(" valide eamil ");
      setPlaceHolder("");
      props.addEmailSubscription(signupNewsEmail);
    } else {
      console.log(" Invalid  eamil ");
      setPlaceHolder(" Invalid email");
    }
    setSignUpNews("");
  };

  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column-1 */}
          <div className="col">
            <h5> Contact: </h5>
            <ul className="list-unstyled">
              <li> 555-555-5555</li>
              <li>info@resortzy.com</li>
              <li>Vondelstraat 123 Amsterdam</li>
              <li>Netherlands</li>
            </ul>
          </div>
          {/* Column-2 */}
          <div className="col">
            <h5>Toll-Free Room Reservations </h5>
            <ul className="list-unstyled">
              <li>International Phone Number:</li>
              <li> + 80017233537 </li>
              <li>+ Prefix with your international access code</li>
            </ul>
          </div>
          {/* Column-3 */}
          <div className="col">
            <h5>Stay Connected</h5>
            <ul className="list-unstyled">
              <li> Enter your email address: </li>
              <li>
                <input
                  name="signupNewsEmail"
                  placeholder={emailPlaceHolder}
                  onChange={(e) => setSignUpNews(e.target.value)}
                  value={signupNewsEmail}
                />
                <br />

                <button onClick={(e) => subscribeNewsLetter(e)}>
                  Subscribe
                </button>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm">
            &copy;{new Date().getFullYear()} RESORTZY | All rights reserved |
            Terms of service | Privacy
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
