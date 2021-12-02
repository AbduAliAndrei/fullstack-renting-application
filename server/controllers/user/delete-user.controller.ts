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
    const { userId }: { userId: string } = httpRequest.body;

    if (!userId) {
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

    const [data, error] = await asyncF(services.deleteUser(userId, authRemove));

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
        statusCode: HttpStatus.OK,
        body: {
          res: data,
        },
      };
    }
  };
}
