import Nav from '../components/LandingPage/Nav'
import Footer from '../components/LandingPage/Footer'


export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}
