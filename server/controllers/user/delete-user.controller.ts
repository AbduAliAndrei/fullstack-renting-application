import { DatabaseObject } from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { authRemove } from "../../database";

export default function createDeleteUser(services: {
  deleteUser: (
    id: string,
    authRemove: ({ uid }: { uid: string }) => Promise<void>
  ) => Promise<DatabaseObject<string>>;
  authRemove: ({ uid }: { uid: string }) => Promise<void>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<string>>> {
  return async function (
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<string>>>> {
    const { id }: { id: string } = httpRequest.body;

    if (!id) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: "Please provide both id and type for user deletion",
        },
      };
    }

    const [data, error] = await asyncF(services.deleteUser(id, authRemove));

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
          res: data,
        },
      };
    }
  };
}
