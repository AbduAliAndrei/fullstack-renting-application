import { HttpRequest } from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import { UserType } from "../../../enums/use-type";
import { Tenant } from "../../../interfaces/tenant";
import { Landlord } from "../../../interfaces/landlord";
import { Admin } from "../../../interfaces/admin";
import controller from "../index";
import Controller from "../../interfaces/controller";
import { DatabaseObject } from "../../interfaces/database-entity";
import { UserExtended } from "../../../interfaces/user-extended";

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
  ): Promise<Controller<DatabaseObject<Required<UserExtended>>>> {
    const {
      source = {},
      ...loginInfo
    }: {
      source: Record<string, unknown>;
      userType: UserType;
      user: Tenant | Landlord | Admin;
    } = httpRequest.body;

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

    let result: Controller<DatabaseObject<Required<UserExtended>>>;
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
    } else if (loginInfo.userType === UserType.TENANT) {
      loginInfo.user.id = created.uid;
      httpRequest.body = { source, user: loginInfo.user };
      result = await controller.postTenant(httpRequest);
      if (result.body.error) {
        await authRemove({ uid: created.uid });
        return result;
      }
      result = {
        ...result,
        cookie: { name: "session", value: sessionCookie, options },
      };
    } else if (loginInfo.userType === UserType.LANDLORD) {
      loginInfo.user.id = created.uid;
      httpRequest.body = { source, user: loginInfo.user };
      result = await controller.postLandlord(httpRequest);
      if (result.body.error) {
        await authRemove({ uid: created.uid });
        return result;
      }

      result = {
        ...result,
        cookie: { name: "session", options, value: sessionCookie },
      };
    } else if (loginInfo.userType === UserType.ADMIN) {
      loginInfo.user.id = created.uid;
      httpRequest.body = { source, user: loginInfo.user };
      result = await controller.postAdmin(httpRequest);
      if (result.body.error) {
        await authRemove({ uid: created.uid });
        return result;
      }
    }

    return result;
  };
}
