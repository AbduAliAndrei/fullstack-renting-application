import { Offer, UpdatedOffer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { DatabaseOfferEntity } from "../../../interfaces/databases/offer-database-entity";

export type UpdateOfferServiceCreator = {
  offersDb: DatabaseOfferEntity<Offer, OfferModel>;
};

export default function updateOfferService({
  offersDb,
}: UpdateOfferServiceCreator) {
  return async function updateOffer(
    offer: UpdatedOffer,
    offerId: string
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    return await offersDb.update({
      key: offerId,
      data: offer as Required<UpdatedOffer>,
    });
  };
}
