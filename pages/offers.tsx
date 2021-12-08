import Card from "../components/Card";
import FilterTool from "../components/FilterTool";
import * as React from "react";
import useFetch, { RequestType } from "../api/data-fetcher";
import { Offer } from "../interfaces/offer";
import { useEffect } from "react";
// import Grid from "@mui/material/Grid";
export default function Offers() {
  const [offers, loading] = useFetch<Offer[]>({
    type: RequestType.GET,
    path: "offers",
    query: [["takeOwner", "true"]],
  });

  useEffect(() => {
    console.log(loading, offers);
  }, [loading, offers]);

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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
