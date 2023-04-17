import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../styles/Featured.module.css";

const imageArray = [
  "/hero/web home.webp",
  "/hero/hompaage 2.webp",
  "/hero/web home3.webp",
];

function Featured() {
  return (
    <div>
      <Carousel
        autoPlay
        interval={4000}
        transitionTime={1000}
        infiniteLoop
        showThumbs={false}
      >
        {imageArray.map((image: any, i: number) => (
          <div key={i}>
            <img src={image} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Featured;
