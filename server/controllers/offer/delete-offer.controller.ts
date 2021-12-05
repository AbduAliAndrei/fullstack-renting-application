import { DatabaseObject } from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import { HttpStatus } from "../../enums/http-status";
import asyncF from "../../../utils/async-f";

export default function createDeleteOffer(services: {
  deleteOffer: (id: string) => Promise<DatabaseObject<string>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<string>>> {
  return async function (
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<string>>>> {
    const { offerId }: { offerId: string } = httpRequest.body;
    if (!offerId) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.BAD_REQUEST,
        body: {
          error: "Please provide ID for offer deletion",
        },
      };
    }
    const [data, error] = await asyncF(services.deleteOffer(offerId));
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
