import Card from "../../components/Card";
import FilterTool from "../../components/FilterTool";
import * as React from "react";
import useFetch, { RequestType } from "../../api/data-fetcher";
import { OfferWithUser } from "../../interfaces/offer";
import { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
import ReactLoading from "react-loading";
export default function Index() {
  const updateOffer = (offerToUpdate) => {
    console.log(offerToUpdate);
    if (offerToUpdate.length > 0) {
      setOffers(offerToUpdate);
    }
  };

  const [offers, setOffers] = useState<OfferWithUser[]>([]);

  const [fetchedOffers, loading] = useFetch<OfferWithUser[]>({
    type: RequestType.GET,
    path: "offers",
    query: [["takeOwner", "true"]],
  });

  useEffect(() => {
    // console.log(loading, fetchedOffers);
    setOffers(fetchedOffers);
  }, [loading, fetchedOffers]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type={"spin"}
          color={"#ff0067"}
          height={167}
          width={175}
        />
      </div>
    );
    // return <div>Loading</div>;
  }

  if (!offers) {
    return <div>Error. No Offers</div>;
  }

  return (
    <div className="Offers">
      <div className="filter-tool">
        <FilterTool updateOffers={updateOffer} />
      </div>
      <div className="offers-container">
        {offers.map((offer) => (
          <Card offer={offer} key={offer.id} />
        ))}
      </div>
    </div>
  );
}
