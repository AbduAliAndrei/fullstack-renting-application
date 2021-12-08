import { DatabaseFunction } from "../../interfaces/database-entity";
import { Offer } from "../../../interfaces/offer";
import { HttpRequest } from "../../interfaces/http-request";
import { requestControllerHandler } from "../utils";
import { HttpStatus } from "../../enums/http-status";
import Controller from "../../interfaces/controller";
import AppException from "../../exceptions/app-exception";

export default function createOffersController({
  getOffers,
}: {
  getOffers: () => Promise<DatabaseFunction<Required<Offer[]>>>;
}) {
  return async function (
    httpRequest: HttpRequest
  ): Promise<Controller<Required<Offer[]>>> {
    try {
      const fetchedData = await requestControllerHandler<
        DatabaseFunction<Required<Offer[]>>
      >(httpRequest, getOffers, []);

      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date().toUTCString(),
        },
        statusCode: HttpStatus.OK,
        body: { res: fetchedData.fetchedData },
      };
    } catch (e) {
      if (e instanceof AppException) {
        return {
          headers: {
            "Content-type": "application/json",
          },
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            error: e.message,
          },
        };
      }
    }
  };
}
