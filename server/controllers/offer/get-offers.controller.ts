import { DatabaseFunction } from "../../interfaces/database-entity";
import { Offer, OfferWithUser } from "../../../interfaces/offer";
import { HttpRequest } from "../../interfaces/http-request";
import { requestControllerHandler } from "../utils";
import { HttpStatus } from "../../enums/http-status";
import Controller from "../../interfaces/controller";
import AppException from "../../exceptions/app-exception";
import { SecuredUser } from "../../../interfaces/user";

export default function createOffersController({
  getOffers,
  getUser,
}: {
  getOffers: () => Promise<DatabaseFunction<Required<Offer[]>>>;
  getUser: ({ id }: { id: string }) => Promise<Required<SecuredUser>>;
}) {
  return async function (
    httpRequest: HttpRequest
  ): Promise<Controller<Required<(Offer | OfferWithUser)[]>>> {
    try {
      const fetchedData = await requestControllerHandler<
        DatabaseFunction<Required<Offer[]>>
      >(httpRequest, getOffers, []);
      if (httpRequest.query["takeOwner"]) {
        await Promise.all(
          fetchedData.fetchedData.map(async (offer) => {
            (offer as OfferWithUser).owner = await getUser({
              id: offer.ownerId,
            });
          })
        );
      }

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
