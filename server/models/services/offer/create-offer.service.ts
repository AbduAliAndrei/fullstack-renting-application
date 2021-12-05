import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { Offer, UpdatedOffer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";

export default function createOfferCreator({
  db,
  makeOffer,
}: {
  db: DatabaseEntity<Offer, OfferModel>;
  makeOffer: (offer: Offer) => OfferModel;
}) {
  return async function createOffer(
    info: Offer
  ): Promise<DatabaseFunction<DatabaseObject<Required<UpdatedOffer>>>> {
    return db.add(makeOffer(info));
  };
}
