/* eslint-disable @next/next/link-passhref */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Typography } from "@material-ui/core";
export default function Card() {
  const offer = {
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
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="Card">
      <div className="offer-images">
        <div className="btns">
          <div className="carousel-btn prev-btn">
            <button>P</button>
          </div>
          <div className="carousel-btn next-btn">
            <button>N</button>
          </div>
        </div>
        <div className="carousel">
          <Slider {...settings}>
            <div className="slider">
              <Image
                src="/DSC_2778.jpg"
                alt="Offer Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="slider">
              <Image
                src="/DSC_2778.jpg"
                alt="Offer Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="slider">
              <Image
                src="/DSC_2778.jpg"
                alt="Offer Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="slider">
              <Image
                src="/DSC_2778.jpg"
                alt="Offer Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div>
              <Image
                src="/DSC_2778.jpg"
                alt="Offer Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div>
              <Image
                src="/DSC_2778.jpg"
                alt="Offer Image"
                objectFit="cover"
                layout="fill"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="offer-details">
        <Typography className="offer-title" variant="h6" component="h6">
          {offer.title}
        </Typography>
        <div className="price-rank">
          <div className="price-info">
            <Typography variant="h4" component="h4">
              {`${offer.price} ${offer.currency}`} / month
            </Typography>
            <p>all included</p>
          </div>
          <div className="offer-ranking">
            <p>38</p>
            <FontAwesomeIcon icon={faArrowUp} color="#5b5f97" />
          </div>
        </div>
        <div className="line"></div>
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
            <div className="landlord-name">
              <p>Abdulla Jaber</p>
            </div>
          </div>
          <div className="facilities">
            <div className="facility">
              <div className="icon">
                <FontAwesomeIcon icon={faCheckCircle} color="#5b5f97" />
              </div>
              <div className="title">
                <p>TV</p>
              </div>
            </div>
            <div className="facilitie">
              <div className="icon">
                <FontAwesomeIcon icon={faCheckCircle} color="#5b5f97" />
              </div>
              <div className="title">
                <p>TV</p>
              </div>
            </div>
            <div className="facilitie">
              <div className="icon">
                <FontAwesomeIcon icon={faCheckCircle} color="#5b5f97" />
              </div>
              <div className="title">
                <p>TV</p>
              </div>
            </div>
            <div className="facilitie">
              <div className="icon">
                <FontAwesomeIcon icon={faCheckCircle} color="#5b5f97" />
              </div>
              <div className="title">
                <p>TV</p>
              </div>
            </div>
          </div>
        </div>
        <div className="datePosted-goToOfferBtn">
          <div className="date-posted">
            <p>{offer.datePosted}</p>
          </div>
          <div className="go-to-offer-btn">
            <Link href="/offerDetails">
              <button>Check Offer</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
