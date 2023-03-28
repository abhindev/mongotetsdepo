import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface Props {
  imageArray: string[];
}

const Slider: React.FC<Props> = ({ imageArray }) => {
  return (
    <Carousel autoPlay interval={5000} transitionTime={1000} infiniteLoop>
      {imageArray.map((image, i) => (
        <div key={i}>
          <img src={image} alt="" />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
