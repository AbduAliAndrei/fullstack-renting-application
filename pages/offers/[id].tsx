import LandlordDetails from "../../components/OfferDetails/LandlordDetails";
import OfferImages from "../../components/OfferDetails/OfferImages";
import OfferSpecification from "../../components/OfferDetails/OfferSpecification";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import OfferDescription from "../../components/OfferDetails/OfferDescription";
import OtherOffers from "../../components/OfferDetails/OtherOffers";
import useFetch, { fetchCall, RequestType } from "../../api/data-fetcher";
import { OfferWithUser } from "../../interfaces/offer";
import { useRouter } from "next/dist/client/router";
import { GetStaticPathsResult } from "next";

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<{ id: string }>
> {
  try {
    const offers: OfferWithUser[] = (
      await (
        await fetchCall({
          type: RequestType.GET,
          path: "offers",
        })
      ).json()
    ).res;
    return {
      paths: offers.map((i) => ({
        params: { id: i.id },
      })),
      fallback: true,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context) {
  const { params } = context;

  return {
    props: { id: params.id },
  };
}

export default function Id(props: { id: string }) {
  const router = useRouter();
  console.log(props, router.query);
  const [offer, loading, error] = useFetch<OfferWithUser>({
    type: RequestType.GET,
    path: "offers",
    query: [["takeOwner", "true"]],
    params: [props.id],
  });

  useEffect(() => {
    console.log(offer);
  }, [offer]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!offer || error) {
    return <div>No Offer</div>;
  }

  return (
    <div className="OfferDetails">
      <div className="offerHeader">
        <Typography className="title" variant="h4" component="h4">
          {offer.generalInfo.title}
        </Typography>
        <Typography className="price" variant="h3" component="h3">
          {offer.generalInfo.cost.totalCost} {"ft"}
          <b style={{ color: "gray", fontSize: "23px" }}>/ Month</b>
        </Typography>
      </div>
      <div className="details-images">
        <OfferImages images={offer.images} />
        <LandlordDetails user={offer.owner} />
      </div>
      <OfferSpecification
        additionalInfo={offer.additionalInfo}
        generalInfo={offer.generalInfo}
      />
      <OfferDescription />
      <OtherOffers />
    </div>
  );
}
