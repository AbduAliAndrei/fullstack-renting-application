import LandlordDetails from "../components/OfferDetails/LandlordDetails";
import OfferImages from "../components/OfferDetails/OfferImages";
import OfferSpecification from "../components/OfferDetails/OfferSpecification";

export default function OfferDetails() {
  return (
    <div className="OfferDetails">
      <LandlordDetails />
      <OfferImages />
      <OfferSpecification />
    </div>
  );
}
