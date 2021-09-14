// import '../styles/App.css'
import React, { useEffect } from 'react'
import Image from 'next/image'
export default function ForLandlords() {
    // const image = "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80"
    return (
        <div className="ForLandlords">
            <div className="title">
                <h1>For Landlords</h1>
            </div>

            <div className="services">
                <div className="service">
                    <div className="service-img">
                        {/* <img src={image} alt="service" /> */}
                    </div>
                    <div className="service-title">
                        <h2>Search fast, search smart</h2>
                    </div>
                    <div className="service-text">
                        <p>Browse hundreds of properties in your city of choice. Save your favorites and set up search alerts so you dont miss your dream place!</p>
                    </div>
                </div>
                <div className="service">
                    <div className="service-img">
                        {/* <img src='https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80' alt="service" /> */}

                    </div>
                    <div className="service-title">
                        <h2>Search fast, search smart</h2>
                    </div>
                    <div className="service-text">
                        <p>Browse hundreds of properties in your city of choice. Save your favorites and set up search alerts so you dont miss your dream place!</p>
                    </div>
                </div>
                <div className="service">
                    <div className="service-img">
                        {/* <img src={image} alt="service" /> */}


                    </div>
                    <div className="service-title">
                        <h2>Search fast, search smart</h2>
                    </div>
                    <div className="service-text">
                        <p>Browse hundreds of properties in your city of choice. Save your favorites and set up search alerts so you dont miss your dream place!</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
