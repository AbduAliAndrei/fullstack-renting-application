import {
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { Offer, OfferBlobs } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";
import { DatabaseOfferEntity } from "../../../interfaces/databases/offer-database-entity";

export default function createOfferCreator({
  db,
  makeOffer,
}: {
  db: DatabaseOfferEntity<Offer, OfferModel>;
  makeOffer: (offer: OfferBlobs, ownerId: string) => OfferModel;
}) {
  return async function createOffer(
    ownerId: string,
    info: OfferBlobs
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    return db.add(makeOffer(info, ownerId));
  };
}
