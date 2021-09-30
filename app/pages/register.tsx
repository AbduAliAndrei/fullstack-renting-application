import { BaseSyntheticEvent, useEffect, useState } from "react";
import { UseType } from "../enums/use-type";
import { UseGender } from "../enums/use-gender";
import { Tenant } from "../interfaces/tenant";
import Landlord from "../interfaces/landlord";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";

const Register = () => {
  const [userType, setUserType] = useState<UseType>(UseType.TENANT);
  const [userGender, setUserGender] = useState<UseGender>(UseGender.Male);
  const [registeringUser, setRegisteringUser] = useState<Tenant | Landlord>({
    email: "andrei.cristea@gmail.com",
    trusted: false,
    firstName: "Andrei",
    lastName: "Cristea",
    password: "123456",
    userName: "Andrei Cristea",
    offersList: [],
    verified: false,
    gender: "male",
    idType: "passport",
    picture: "svg.net",
  });

  const [xsrfToken] = useCookies(["XSRF-TOKEN"]);
  const [sessionCookie] = useCookies(["sessionCookie"]);

  const [userTypes] = useState<UseType[]>(Object.values(UseType));
  const [userGenders] = useState<UseGender[]>(Object.values(UseGender));

  const onInputChange = (event: BaseSyntheticEvent) =>
    setRegisteringUser({
      ...registeringUser,
      [event.currentTarget.name]: event.currentTarget.value,
    });

  useEffect(() => {
    // console.log(xsrfToken['XSRF-Token']);
  }, []);

  const register = () => {
    return fetch("api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": xsrfToken["XSRF-Token"],
      },
      body: JSON.stringify({
        user: registeringUser,
        userType: userType,
      }),
    });
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const res = await register();
    console.log(res);
  };

  return (
    <div className="Register">
      <div className="header-form">
        <div className="register-form-header">
          <div className="logo">
            <Link href="/">
              <a>viaRent</a>
            </Link>
          </div>
          <div className="back-home-btn">
            <Link href="/">
              <button>Go Back Home</button>
            </Link>
          </div>
        </div>
        <form onSubmit={onSubmit} className="register-form">
          <div className="input-field">
            <div className="type-names">
              <div className="type">
                <label className="form__label" htmlFor={"userType"}>
                  Are you a landlord or a tenant?
                </label>
                <select id={"userType"}>
                  {userTypes.map((userType, index) => (
                    <option
                      value={userType}
                      key={index}
                      onSelect={(e) =>
                        setUserType(e.currentTarget.value as UseType)
                      }
                    >
                      {userType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="first-name">
                <label className="form__label" htmlFor={"userGender"}>
                  First Name
                </label>
                <input
                  type={"text"}
                  name={"firstName"}
                  placeholder={"Enter your firstName"}
                  onChange={onInputChange}
                  value={registeringUser.firstName}
                />
              </div>
              <div className="last-name">
                <label className="form__label" htmlFor={"userGender"}>
                  Last Name
                </label>
                <input
                  type={"text"}
                  name={"lastName"}
                  placeholder={"Enter your lastName"}
                  onChange={onInputChange}
                  value={registeringUser.lastName}
                />
              </div>
            </div>
            <div className="gender-email-pass">
              <div className="gender">
                <label className="form__label" htmlFor={"userGender"}>
                  Gender
                </label>
                <select id={"userGender"}>
                  {userGenders.map((userGender, index) => (
                    <option
                      value={userType}
                      key={index}
                      onSelect={(e) =>
                        setUserGender(e.currentTarget.value as UseGender)
                      }
                    >
                      {userGender}
                    </option>
                  ))}
                </select>
              </div>
              <div className="email">
                <label className="form__label" htmlFor={"userGender"}>
                  Email
                </label>
                <input
                  type={"text"}
                  name={"email"}
                  placeholder={"Enter your email"}
                  onChange={onInputChange}
                  value={registeringUser.email}
                />
              </div>
              <div className="password">
                <label className="form__label" htmlFor={"userGender"}>
                  Password
                </label>
                <input
                  type={"password"}
                  name={"password"}
                  placeholder={"Enter your password"}
                  onChange={onInputChange}
                  value={registeringUser.password}
                />
              </div>
            </div>
          </div>
          <div className="register-btn-container">
            <button id="register-btn" type={"submit"}>
              Register
            </button>
          </div>
        </form>
        <div className="register-with">
          <p>Register With</p>
          <div className="social-media">
            <span>Google</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <div className="login-img">
        <Image
          src="/DSC_2778.jpg"
          alt="Landlord Image"
          className="ld-img"
          objectFit="cover"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default Register;
