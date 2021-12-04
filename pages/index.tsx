import Header from "../components/LandingPage/Header";
import RecentOffers from "../components/LandingPage/RecentOffers";
import ForLandlords from "../components/LandingPage/ForLandlords";

export default function Home() {
  return (
    <div>
      <Header />
      <ForLandlords />
      <RecentOffers />
    </div>
  );
}
