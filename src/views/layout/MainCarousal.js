import React from "react";
import { Carousel } from "react-bootstrap";

const mainCarousal = () => {
  return (
    <div className="main-caraousel">
      <Carousel slide={false} fade={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousal1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2> Whatever you want. Whoever you are</h2>
            <h3> Go happy. Go HoJo. & Go anywhere. Stay here</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousal2.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2> Stay with us, feel at home </h2>
            <h3> Twice the comfort, twice the value, twice the Hotel</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousal3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2> Welcome to your residence</h2>
            <h3> Come In As Guests. Leave As Family.</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default mainCarousal;
