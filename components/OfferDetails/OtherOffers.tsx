import Typography from "@mui/material/Typography";
import React from "react";
import Card from "../Card";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
export default function OtherOffers() {
  return (
    <div className="OtherOffers">
      <div className="otherLandLordListing">
        <Typography className="title" variant="h5" component="h5">
          Other listings from this landlord
        </Typography>
        <div className="card-arrows">
          <ArrowBackIcon fontSize="large" />

          <Card />
          <ArrowForwardIcon fontSize="large" />
        </div>
      </div>
      <div className="otherRandomOffers">
        <Typography className="title" variant="h5" component="h5">
          Offers that may interest you
        </Typography>
        <div className="card-arrows">
          <ArrowBackIcon fontSize="large" />
          <Card />
          <ArrowForwardIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}
