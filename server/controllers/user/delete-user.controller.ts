import { UserType } from "../../../enums/user-type";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";

export default function createDeleteUser(services: {
  deleteUser: (
    id: string,
    type: UserType
  ) => Promise<DatabaseFunction<DatabaseObject<string>>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<string>>> {
  return async function (
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<string>>>> {
    const { id, type }: { id: string; type: UserType } = httpRequest.body;

    const [data, error] = await asyncF(services.deleteUser(id, type));

    if (error) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: error as string,
        },
      };
    } else {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
        body: {
          res: data.data,
        },
      };
    }
  };
}
