import React from "react";
import "./Footer.css";

const footer = () => {
  return (
    <div>
      <br />
      <footer className="common-footer">
        <div className="col-md-3"></div>
        <div className="col-md-3 my-3">
          <h4>Contact</h4>
          <hr />
          <p>555-555-5555</p>
          <p>info@resortzy.com</p>
          <p>Vondelstraat 123 Amsterdam, NL</p>
        </div>
        <div className="about col-md-3 my-3">
          <h4>About Us</h4>
          <hr />
          <a href="/">About Resortzy</a> <br />
          <a href="/about">About the Developers</a>
        </div>
        <div className="col-md-3"></div>
      </footer>
    </div>
  );
};

export default footer;
