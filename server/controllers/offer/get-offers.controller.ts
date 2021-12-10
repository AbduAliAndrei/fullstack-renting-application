import { DatabaseFunction } from "../../interfaces/database-entity";
import { Offer, OfferWithUser } from "../../../interfaces/offer";
import { HttpRequest } from "../../interfaces/http-request";
import { parseOfferQueryToString, requestControllerHandler } from "../utils";
import { HttpStatus } from "../../enums/http-status";
import Controller from "../../interfaces/controller";
import AppException from "../../exceptions/app-exception";
import { SecuredUser } from "../../../interfaces/user";
import { FilterBy } from "../../interfaces/databases/generic-database-entity";
import {
  AllowedFilterOfferKeys,
  AllowedFilterOfferKeysType,
} from "../../../enums/allowed-offer-keys";
import omitBy from "lodash/omitBy";

export default function createOffersController({
  getOffers,
  getUser,
}: {
  getOffers: ({
    filterBy,
  }: {
    filterBy: FilterBy<AllowedFilterOfferKeys>;
  }) => Promise<DatabaseFunction<Required<Offer[]>>>;
  getUser: ({ id }: { id: string }) => Promise<Required<SecuredUser>>;
}) {
  return async function (
    httpRequest: HttpRequest
  ): Promise<Controller<Required<(Offer | OfferWithUser)[]>>> {
    try {
      const filterBy: FilterBy<AllowedFilterOfferKeysType> = omitBy(
        {
          [AllowedFilterOfferKeys.CITY]: parseOfferQueryToString(
            httpRequest.query["filter." + AllowedFilterOfferKeys.CITY]
          ),
          [AllowedFilterOfferKeys.TITLE]: parseOfferQueryToString(
            httpRequest.query["filter." + AllowedFilterOfferKeys.TITLE]
          ),
          [AllowedFilterOfferKeys.PRICE]: parseOfferQueryToString(
            httpRequest.query["filter." + AllowedFilterOfferKeys.PRICE]
          ),
          [AllowedFilterOfferKeys.DISTRICT]: parseOfferQueryToString(
            httpRequest.query["filter." + AllowedFilterOfferKeys.DISTRICT]
          ),
        },
        (el) => {
          return !el;
        }
      );
      const fetchedData = await requestControllerHandler<
        DatabaseFunction<Required<Offer[]>>
      >(httpRequest, getOffers, [], { filterBy });
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
