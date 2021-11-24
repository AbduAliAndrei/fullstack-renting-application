import { HttpRequest } from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import controller from "../index";
import Controller from "../../interfaces/controller";
import { DatabaseObject } from "../../interfaces/database-entity";
import { SecuredUser, User } from "../../../interfaces/user";

export default function createRegisterAttempt({
  createUser,
  authCreate,
  authRemove,
}: {
  createUser: ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => Promise<{ uid: string; idToken: string }>;
  authCreate: ({
    idToken,
    expire,
  }: {
    idToken: string;
    expire: number;
  }) => Promise<string>;
  authRemove: ({ uid }: { uid: string }) => Promise<void>;
}) {
  return async function registerAttempt(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<SecuredUser>>>> {
    const {
      source = {},
      ...loginInfo
    }: // eslint-disable-next-line @typescript-eslint/ban-types
    { source: {}; user: User } = httpRequest.body;

    const [created, createdError] = await asyncF(
      createUser({
        password: loginInfo.user.password,
        email: loginInfo.user.email,
      })
    );
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    if (createdError) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 409,
        body: {
          error: `Couldn't create user, Error: ${createdError}`,
        },
      };
    }

    const [sessionCookie, sessionCookieError] = await asyncF(
      authCreate({ idToken: created.idToken, expire: expiresIn })
    );

    let result: Controller<DatabaseObject<Required<SecuredUser>>>;
    const options = { maxAge: expiresIn, httpOnly: true };

    if (sessionCookieError) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 401,
        body: {
          error: `Unauthorized, ${sessionCookieError}`,
        },
      };
    } else {
      loginInfo.user.id = created.uid;
      result = await controller.postUser(httpRequest);

      if (result.body.error) {
        await authRemove({ uid: created.uid });
        return result;
      }

      result = {
        ...result,
        cookie: { name: "session", value: sessionCookie, options },
      };
    }

    return result;
  };
}
