import Card from "../components/Card";
import FilterTool from "../components/FilterTool";
import * as React from "react";
import useFetch, { RequestType } from "../api/data-fetcher";
import { OfferWithUser } from "../interfaces/offer";
import { useEffect } from "react";
// import Grid from "@mui/material/Grid";
export default function Offers() {
  const [offers, loading] = useFetch<OfferWithUser[]>({
    type: RequestType.GET,
    path: "offers",
    query: [["takeOwner", "true"]],
  });

  useEffect(() => {
    console.log(loading, offers);
  }, [loading, offers]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!offers) {
    return <div>Error. No Offers</div>;
  }

  return (
    <div className="Offers">
      <div className="filter-tool">
        <FilterTool />
      </div>
      {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Card />
        </Grid>
        <Grid item xs={4}>
          <Card />
        </Grid>
        <Grid item xs={4}>
          <Card />
        </Grid>
        <Grid item xs={4}>
          <Card />
        </Grid>
        <Grid item xs={4}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
        <Grid item xs={6}>
          <Card />
        </Grid>
      </Grid> */}
      <div className="offers-container">
        {offers.map((offer) => (
          <Card offer={offer} key={offer.id} />
        ))}
      </div>
    </div>
  );
}
