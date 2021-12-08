import Card from "../../components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import useFetch, { RequestType } from "../../api/data-fetcher";
import { OfferWithUser } from "../../interfaces/offer";
export default function RecentOffers() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipe: false,
  };

  const [offers, loading] = useFetch<OfferWithUser[]>({
    type: RequestType.GET,
    path: "offers",
    query: [["takeOwner", "true"]],
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (!offers) {
    return <div>Error. No Offers</div>;
  }

  return (
    <div className="RecentOffers">
      <div className="title">
        <h1>Recent Offers</h1>
      </div>

      <Slider className="slider-container" {...settings}>
        {offers.map((offer) => (
          <Card offer={offer} key={offer.id} />
        ))}
      </Slider>
    </div>
  );
}
