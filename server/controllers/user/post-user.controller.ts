import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http-request";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { UserModel } from "../../interfaces/models/user.type";
import { User } from "../../../interfaces/user";

export default function createPostUser({
  createUser,
}: {
  createUser: (
    userInfo: UserModel
  ) => Promise<DatabaseFunction<DatabaseObject<Required<User>>>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<Required<User>>>> {
  return async function postUser(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<User>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<User>>>
    > => {
      const { source = {}, user } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }

      return await createUser({
        ...user,
        source,
      });
    };

    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<User>>>
    >(postProcess());
    let result!: Controller<DatabaseObject<Required<User>>>;
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
