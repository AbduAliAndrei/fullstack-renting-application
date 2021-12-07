import { SecuredUser, UpdatedUser } from "../../../interfaces/user";
import asyncF from "../../../utils/async-f";
import { HttpStatus } from "../../enums/http-status";
import Controller from "../../interfaces/controller";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";

export default function createUpdateUser({
  putUser,
}: {
  putUser: (
    userInfo: UpdatedUser,
    userId: string
  ) => Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>>;
}): (
  h: HttpRequest
) => Promise<Controller<DatabaseObject<Required<SecuredUser>>>> {
  return async function updateUser(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<SecuredUser>>>> {
    const updateProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<SecuredUser>>>
    > => {
      const { source = {}, user, userId } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }
      return await putUser(
        {
          ...user,
        },
        userId
      );
    };
    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<SecuredUser>>>
    >(updateProcess());
    let result!: Controller<DatabaseObject<Required<SecuredUser>>>;
    if (error) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.BAD_REQUEST,
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
        statusCode: HttpStatus.OK,
        body: { res: data.fetchedData },
      };
    }
    return result;
  };
}
