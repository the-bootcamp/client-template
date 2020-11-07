import React from "react";
import { Carousel } from "react-bootstrap";

const mainCarousal = () => {
  return (
    <div>
      <Carousel slide={false} fade={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousal1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3> </h3>
            <p> </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousal2.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p> </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousal3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3> </h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default mainCarousal;
