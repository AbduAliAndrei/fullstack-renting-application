// import '../styles/App.css'
import React, { useEffect } from 'react'
import styles from '../styles/sass/_header.scss'
import Link from 'next/link'
export default function Header() {
    return (
        <div className="Header">
            <div className="title">
                <h1>Let’s find you the best apartment
                    in Budapest</h1>
            </div>
            <div className="available-offers">
                <button> <Link href="/Offers"><a>Available  Offers</a></Link></button>
            </div>
        </div>
    )

}
