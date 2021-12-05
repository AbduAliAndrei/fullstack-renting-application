import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function OfferImages() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="OfferImages">
      <Slider {...settings}>
        <div className="slider">
          <Image
            className="im"
            src="/budapest.jpg"
            alt="Offer Image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="slider">
          <Image
            className="im"
            src="/DSC_2778.jpg"
            alt="Offer Image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="slider">
          <Image
            className="im"
            src="/budapest2.jpg"
            alt="Offer Image"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="slider">
          <Image
            className="im"
            src="/DSC_2778.jpg"
            alt="Offer Image"
            objectFit="cover"
            layout="fill"
          />
        </div>
      </Slider>
    </div>
  );
}
