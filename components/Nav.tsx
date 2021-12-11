// import '../styles/App.css'
import React, { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

// import your icons
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLinkProps } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import UserLogged, { IUserLogged } from "../context/user-logged.context";
import { fetchCall, RequestType } from "../api/data-fetcher";
import { HttpStatus } from "../server/enums/http-status";

function LoggedInUserNav(props) {
  const router = useRouter();
  const { setUserLoggedOut } = useContext<IUserLogged>(UserLogged);

  const onLogout = useCallback(async () => {
    const responsePromise = await fetchCall({
      type: RequestType.POST,
      path: "auth/logout",
    });
    if (responsePromise.status === HttpStatus.MOVED_PERMANENTLY) {
      setUserLoggedOut();
      await router.push("/login");
    }
  }, [router, setUserLoggedOut]);

  return (
    <div className="Nav">
      <input type="checkbox" id="check" />

      <div className="ham-menu" />

      <label htmlFor="check" className="ham-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      <div className="logo">
        <Link href="/">
          <a>lambdaRents</a>
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
      <div className="profileDetails">
        <div className="primaryInfo">
          <div className="imgContainer">
            <Image
              className="userProfileImg"
              src="/DSC_2778.jpg"
              alt="Image"
              objectFit="cover"
              layout="fill"
              priority={true}
            />
          </div>
          <Typography className="userName" variant="h6" component="h6">
            {props.userName}
          </Typography>
        </div>
        <div className="userMenu">
          <nav>
            <ul>
              <li className={router.pathname === "/" ? "active" : ""}>
                <Link href="/profile">
                  <a href="">My offers</a>
                </Link>
              </li>
              <li className={router.pathname === "/offers" ? "active" : ""}>
                <Link href="/profile">
                  <a href="">Settings</a>
                </Link>
              </li>
              <li className={router.pathname === "/contact" ? "active" : ""}>
                <span onClick={onLogout}>Log out</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default function Nav({}: NavLinkProps) {
  const router = useRouter();
  const userContext = useContext<IUserLogged>(UserLogged);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (userContext.user && userContext.user.userName) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [userContext.user]);

  return userLoggedIn && userContext.user ? (
    <LoggedInUserNav userName={userContext.user.userName} />
  ) : (
    <div className="Nav">
      <input type="checkbox" id="check" />

      <div className="ham-menu" />

      <label htmlFor="check" className="ham-menu">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </label>
      <div className="logo">
        <Link href="/">
          <a>lambdaRents</a>
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
          <Link href="/login" passHref>
            <Button disableElevation className="logInBtn" variant="contained">
              Log In
            </Button>
          </Link>
        </div>
        <div className="signup">
          <Link href="/register" passHref>
            <Button disableElevation className="signUpBtn" variant="contained">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
