import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http-request";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { SecuredUser, User } from "../../../interfaces/user";
import { UserType } from "../../../enums/user-type";

export default function createPostUser({
  createUser,
}: {
  createUser: (
    userInfo: User,
    userType: UserType
  ) => Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>>;
}): (
  h: HttpRequest
) => Promise<Controller<DatabaseObject<Required<SecuredUser>>>> {
  return async function postUser(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<SecuredUser>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<SecuredUser>>>
    > => {
      const { source = {}, user, userType } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }

      return await createUser(
        {
          ...user,
        },
        userType
      );
    };

    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<SecuredUser>>>
    >(postProcess());
    let result!: Controller<DatabaseObject<Required<SecuredUser>>>;
    if (error) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: (error as { message: string }).message,
        },
      };
    } else {
      result = {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(data.fetchedData.writeTime).toUTCString(),
        },
        statusCode: 201,
        body: { res: data.fetchedData },
      };
    }

    return result;
  };
}
