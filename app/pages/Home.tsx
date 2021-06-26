import Header from '../components/LandingPage/Header'
import RecentOffers from '../components/LandingPage/RecentOffers'
import ForLandlords from '../components/LandingPage/ForLandlords'

// import { Nav, Header, RecentOffers, ForLandlords, Footer } from '../components/LandingPage/Nav'

export default function Home() {
  return (
    <div>
      <Header />

      <RecentOffers />
      <ForLandlords />
    </div>
  )
}
