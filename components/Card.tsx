/* eslint-disable @next/next/link-passhref */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Typography } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import { OfferWithUser } from "../interfaces/offer";
import { format } from "date-fns";

export default function Card({ offer }: { offer: OfferWithUser }) {
  const mock = {
    title: "offer title Name",
    description: "offer description",
    price: "155,000",
    currency: "Huf",
    allIncluded: true,
    datePosted: "12 august 2021",
    facilities: {
      fridge: true,
      AC: true,
      washing_machine: true,
      wifi: true,
      gas_heating: true,
      dryer: true,
      tv: true,
      oven: true,
      stove: true,
      dishwasher: true,
      microwave: true,
      fan: true,
    },
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getCheckColor = (isChecked: boolean) =>
    isChecked ? "#00EAD3" : "#000000";

  return (
    <div className="Card">
      <div className="offer-images">
        {/* <div className="btns">
          <div className="carousel-btn prev-btn">
            <button>P</button>
          </div>
          <div className="carousel-btn next-btn">
            <button>N</button>
          </div>
        </div> */}
        <div className="carousel">
          <Slider {...settings}>
            {offer.images.map((imageSrc, index) => (
              <div key={index} className="slider">
                <Image
                  className="im"
                  src={imageSrc}
                  alt="Offer Image"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            ))}

            {/* <Image
              className="im"
              src="/DSC_2778.jpg"
              alt="Offer Image"
              objectFit="cover"
              layout="fill"
            />
            <Image
              className="im"
              src="/DSC_2778.jpg"
              alt="Offer Image"
              objectFit="cover"
              layout="fill"
            />
            <Image
              className="im"
              src="/DSC_2778.jpg"
              alt="Offer Image"
              objectFit="cover"
              layout="fill"
            />
            <Image
              className="im"
              src="/DSC_2778.jpg"
              alt="Offer Image"
              objectFit="cover"
              layout="fill"
            />
            <Image
              className="im"
              src="/DSC_2778.jpg"
              alt="Offer Image"
              objectFit="cover"
              layout="fill"
            /> */}
          </Slider>
        </div>
      </div>
      <div className="offer-details">
        <Typography className="offer-title" variant="h6" component="h6">
          {offer.generalInfo.title}
        </Typography>
        <div className="price-rank">
          <div className="price-info">
            <Typography className="price" variant="h4" component="h4">
              {`${offer.generalInfo.cost.totalCost} ${
                offer.generalInfo.cost.currency ?? "Huf"
              }`}{" "}
              / Month
            </Typography>
            {/*<p>all included</p>*/}
          </div>
          <div className="offer-ranking">
            <span>
              <p>38</p>
              <FontAwesomeIcon icon={faArrowUp} color="#ff0067" />
            </span>
          </div>
        </div>
        <div className="line" />
        <div className="landlord-facilities">
          <div className="landlord">
            <div className="landlord-img">
              <Image
                src="/DSC_2778.jpg"
                alt="Landlord Image"
                className="ld-img"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="landlord-name-username">
              <Typography className="landlordName" variant="h5" component="h5">
                {offer.owner.firstName} {offer.owner.lastName}
              </Typography>
              <Typography
                className="landlordUsername"
                variant="h5"
                component="h5"
              >
                {offer.owner.userName}
              </Typography>
            </div>
          </div>
          <div className="facilities">
            <div>
              <div className="facility">
                <Check
                  style={{
                    color: getCheckColor(!!offer.additionalInfo.features),
                  }}
                />
                <span>Heater</span>
              </div>
              <div className="facility">
                <Check
                  style={{
                    color: getCheckColor(!!offer.additionalInfo.features),
                  }}
                />
                <span>Fridge</span>
              </div>
            </div>
            <div>
              <div className="facility">
                <Check
                  style={{
                    color: getCheckColor(!!offer.additionalInfo.features),
                  }}
                />
                <span>TC</span>
              </div>
              <div className="facility">
                <Check
                  style={{
                    color: getCheckColor(!!offer.additionalInfo.features),
                  }}
                />
                <span>WI-FI</span>
              </div>
            </div>
          </div>
        </div>
        <div className="datePosted">
          <div className="date-posted">
            <Typography className="date-posted" variant="h5" component="h5">
              {format(new Date(offer.validFrom), "dd LLLL yyyy")}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
