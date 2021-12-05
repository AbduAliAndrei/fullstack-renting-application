import LandlordDetails from "../components/OfferDetails/LandlordDetails";
import OfferImages from "../components/OfferDetails/OfferImages";
import OfferSpecification from "../components/OfferDetails/OfferSpecification";
import Button from "@material-ui/core/Button";
import React from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";
import OfferDescription from "../components/OfferDetails/OfferDescription";
import OtherOffers from "../components/OfferDetails/OtherOffers";
export default function OfferDetails() {
  return (
    <div className="OfferDetails">
      <div className="offerHeader">
        <Typography className="title" variant="h4" component="h4">
          Cozy studio apartment in Astoria suitable for couples next to 4/6
        </Typography>
        <Typography className="price" variant="h3" component="h3">
          500 000 00 ft
          <b style={{ color: "gray", fontSize: "23px" }}>/ Month</b>
        </Typography>
      </div>
      <div className="details-images">
        <OfferImages />
        <LandlordDetails />
      </div>
      <OfferSpecification />
      <OfferDescription />
      <OtherOffers />
    </div>
  );
}
