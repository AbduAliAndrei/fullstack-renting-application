import { DatabaseObject } from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { authRemove } from "../../database";
import { HttpStatus } from "../../enums/http-status";

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
        statusCode: HttpStatus.BAD_REQUEST,
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
        statusCode: HttpStatus.BAD_REQUEST,
        body: {
          error: error as string,
        },
      };
    } else {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.NO_CONTENT,
        body: {
          res: data,
        },
      };
    }
  };
}
