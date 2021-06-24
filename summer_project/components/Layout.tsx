import Nav from './Nav'
import Footer from './Footer'


export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <div className="children">
                {children}
            </div>
            <Footer />
        </div>
    )
}
