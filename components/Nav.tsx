// import '../styles/App.css'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

// import your icons
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLinkProps } from "react-bootstrap";
import Button from "@material-ui/core/Button";

function loggedInUserNav() {
  const router = useRouter();

  return (
    <div className="Nav">
      <input type="checkbox" id="check" />

      <div className="ham-menu" />

      <label htmlFor="check" className="ham-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      <div className="logo">
        <Link href="/">
          <a>viaRent</a>
        </Link>
      </div>
      <div className="menu">
        <nav>
          <ul>
            <li className={router.pathname === "/" ? "active" : ""}>
              <Link href="/">
                <a href="">Home</a>
              </Link>
            </li>
            <li className={router.pathname === "/offers" ? "active" : ""}>
              <Link href="/offers">
                <a href="">Offers</a>
              </Link>
            </li>
            <li className={router.pathname === "/contact" ? "active" : ""}>
              <Link href="/contact">
                <a href="">Contact Us</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className="login_signup">
        <div className="login">
          <Link href="/login">
            <Button disableElevation className="logInBtn" variant="contained">
              Log In
            </Button>
          </Link>
        </div>
        <div className="signup">
          <Link href="/register">
            <Button disableElevation className="signUpBtn" variant="contained">
              Sign Up
            </Button>
          </Link>
        </div>
      </div> */}
    </div>
  );
}
export default function Nav({}: NavLinkProps) {
  const router = useRouter();
  let userLoggedIn = false;
  return userLoggedIn ? (
    loggedInUserNav()
  ) : (
    <div className="Nav">
      <input type="checkbox" id="check" />

      <div className="ham-menu" />

      <label htmlFor="check" className="ham-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      <div className="logo">
        <Link href="/">
          <a>viaRent</a>
        </Link>
      </div>
      <div className="menu">
        <nav>
          <ul>
            <li className={router.pathname === "/" ? "active" : ""}>
              <Link href="/">
                <a href="">Home</a>
              </Link>
            </li>
            <li className={router.pathname === "/offers" ? "active" : ""}>
              <Link href="/offers">
                <a href="">Offers</a>
              </Link>
            </li>
            <li className={router.pathname === "/contact" ? "active" : ""}>
              <Link href="/contact">
                <a href="">Contact Us</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="login_signup">
        <div className="login">
          <Link href="/login">
            <Button disableElevation className="logInBtn" variant="contained">
              Log In
            </Button>
          </Link>
        </div>
        <div className="signup">
          <Link href="/register">
            <Button disableElevation className="signUpBtn" variant="contained">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
