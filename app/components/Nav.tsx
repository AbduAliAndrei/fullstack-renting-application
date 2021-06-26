// import '../styles/App.css'
import React, { useEffect } from 'react'
import styles from '../styles/sass/_nav.scss'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/dist/client/router'

// import your icons
import { faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav({ children, href, ...props }: NavLinkProps) {
  const router = useRouter()


  return (
    <div className="Nav">
      <div className="ham-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />

      </div>
      <div className="logo">
        <Link href='/'><a>viaRent</a></Link>
      </div>
      <div className="menu">
        <nav>
          <ul >
            <li className={router.pathname === "/" ? "active" : ""}><Link href="/"><a href="">Home</a></Link></li>
            <li className={router.pathname === "/Offers" ? "active" : ""}><Link href="/Offers"><a href="">Offers</a></Link></li>
          </ul>
        </nav >
      </div >
      <div className="login_signin">
        <div className="login">
          <FontAwesomeIcon icon={faSignInAlt} />
          <span>Login</span>
        </div>
        <div className="signin">
          <p>Don't have account? <Link href="/"><a>Sign In</a></Link></p>
        </div>
      </div>
    </div >
  )

}
