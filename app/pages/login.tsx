import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [loginUser, setLoginUser] = useState<{
    email: string;
    password: string;
  }>({ email: "andrei@gmail.com", password: "123456" });

  const changeLoginInfo = useCallback(
    (e: BaseSyntheticEvent) => {
      setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    },
    [loginUser]
  );

  const [xsrfToken] = useCookies(["XSRF-TOKEN"]);
  const [sessionCookie] = useCookies(["session"]);
  const router = useRouter();

  const register = async () => {
    const data = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": xsrfToken["XSRF-Token"],
      },
      body: JSON.stringify(loginUser),
    });

    return await data.json();
  };

  useEffect(() => {
    console.log(sessionCookie, xsrfToken, document.cookie);
  }, []);

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const user = await register();
    console.log(user, sessionCookie, document.cookie);
    debugger;
    if (user) await router.push("/profile");
  };

  return (
    <div className="Login">
      <div className="header-form">
        <div className="login-form-header">
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
        <form className="login-form" onSubmit={onSubmit}>
          <div className="input-field">
            <div className="email">
              <input
                type={"string"}
                className="form__field"
                placeholder={"Email"}
                required
                onChange={changeLoginInfo}
                value={loginUser.email}
                name={"email"}
                id="email"
              />
              <label className="form__label">Email</label>
            </div>
            <div className="password">
              <input
                type={"password"}
                className="form__field"
                onChange={changeLoginInfo}
                value={loginUser.password}
                name={"password"}
                id="password"
                placeholder={"Password"}
                required
              />
              <label className="form__label">Password</label>
            </div>
          </div>
          <div className="login-register-btns">
            <div className="register-forgotPass">
              <Link href="/register">
                <button>Register</button>
              </Link>
              <button>Forgot Password?</button>
            </div>
            <button id="login-btn" type={"submit"}>
              Login
            </button>
          </div>
          <div className="login-with">
            <p>Login With</p>
            <div className="social-media">
              <span>Google</span>
              <span>Facebook</span>
            </div>
          </div>
        </form>
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

export default Login;
