import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@material-ui/core/Button";
import People from "@material-ui/icons/People";

export default function OfferSpecification() {
  return (
    <div className="OfferSpecification">
      <div className="specification">
        <div className="offerHeader">
          <div className="offer-duration">
            <Typography
              className="offerTitleH1"
              color="black"
              variant="h3"
              component="h3"
            >
              until 2021 august
            </Typography>
          </div>
          <div className="offer-title">
            <Typography
              className="offerTitleH1"
              color="black"
              variant="h1"
              component="h1"
            >
              Offer title
            </Typography>
          </div>
          <div className="offer-price">
            <Typography
              className="offerPriceH1"
              color="gray"
              variant="h1"
              component="h1"
            >
              500 000 ft / month
            </Typography>
          </div>
          <div className="studentFriendly">
            <Button
              className="studentFriendlyContainer"
              startIcon={<People />}
              variant="contained"
              color="primary"
            >
              Student choice
            </Button>
          </div>
        </div>
        <div className="mainDetails">
          <div className="">
            <div className="location">
              <Typography
                className="locationH1"
                color="black"
                variant="h4"
                component="h4"
              >
                Blaha utca 92, Budapest
              </Typography>
            </div>
            <div className="flatInfo">
              <div className="size">Size: 25 sq/m</div>
              <div className="bedRoom">Bedroom(s): 2</div>
              <div className="kitchen">kitchen</div>
              <div className="bathrooms">bathroom(s): 2</div>
            </div>
          </div>
          <div className="locationAdvantages">
            <div className="universities">
              <div className="university">
                <div className="uniName">ELTE</div>
                <div className="distance">0.2 km</div>
              </div>
              <div className="university">
                <div className="uniName">BME</div>
                <div className="distance">2 km</div>
              </div>
            </div>
            <div className="transportations">
              <div className="transportationType">Tram</div>
              <div className="transportation">
                <div className="transportationName">1</div>
                <div className="distance">2 km</div>
              </div>
              <div className="transportation">
                <div className="transportationName">4/6</div>
                <div className="distance">1 km</div>
              </div>
            </div>
          </div>
          <div className="offerFeatures">
            <div className="subTitle">
              <Typography
                className="featuresH4"
                color="black"
                variant="h4"
                component="h4"
              >
                Features
              </Typography>
            </div>
            <div className="featuresList">
              <ul>
                <li>best property</li>
                <li>best property</li>
                <li>best property</li>
                <li>best property</li>
                <li>best property</li>
                <li>best property</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
        <p>s</p>
      </div>
    </div>
  );
}
