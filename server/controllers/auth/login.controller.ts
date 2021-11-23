import { HttpRequest } from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import { User } from "../../../interfaces/user";

export default function createLogin({
  loginUser,
  authCreate,
}: {
  loginUser: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<[Required<User>, string]>;
  authCreate: ({
    idToken,
    expire,
  }: {
    idToken: string;
    expire: number;
  }) => Promise<string>;
}) {
  return async function login(
    httpRequest: HttpRequest
  ): Promise<Controller<Required<User>>> {
    const {
      source = {},
      ...loginInfo
    }: // eslint-disable-next-line @typescript-eslint/ban-types
    { source: {}; email: string; password: string } = httpRequest.body;

    const [checked, checkedError] = await asyncF(
      loginUser({ email: loginInfo.email, password: loginInfo.password })
    );

    let result: Controller<Required<User>>;
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = { maxAge: expiresIn, httpOnly: true, secure: false };

    const [sessionCookie, sessionCookieError] = await asyncF(
      authCreate({ idToken: checked[1], expire: expiresIn })
    );

    if (sessionCookieError || !sessionCookie) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: `Error with session cookie. ${sessionCookieError}`,
        },
      };
    } else if (checkedError) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 401,
        body: {
          error: `Unauthorized, ${checkedError}`,
        },
      };
    } else {
      result = {
        cookie: { name: "session", value: sessionCookie, options },
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          res: checked[0],
        },
      };
    }

    return result;
  };
}
