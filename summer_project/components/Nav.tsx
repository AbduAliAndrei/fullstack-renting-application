// import '../styles/App.css'
import React, { useEffect } from 'react'
import styles from '../styles/sass/_nav.scss'
import Link from 'next/link'
export default function Nav() {

  return (
    <div className="Nav">
      <div className="logo">
        <h1>viaRent</h1>
      </div>
      <div className="menu">
        <nav>
          <ul >
            <li className="active" ><Link href="/"><a href="">Home</a></Link></li>
            <li ><Link href="/Offers"><a href="">Offers</a></Link></li>
          </ul>
        </nav>
      </div>
      <div className="login_signUp">
        <div className="login">
          <p>Login</p>
        </div>
        <div className="signup">
          <p>Don't have account? Sign Up</p>
        </div>
      </div>
    </div>
  )

}
