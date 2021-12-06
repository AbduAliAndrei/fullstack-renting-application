import {
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { Offer, CreatedOffer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";
import { DatabaseOfferEntity } from "../../../interfaces/databases/offer-database-entity";

export default function createOfferCreator({
  db,
  makeOffer,
}: {
  db: DatabaseOfferEntity<Offer, OfferModel>;
  makeOffer: (offer: CreatedOffer, ownerId: string) => OfferModel;
}) {
  return async function createOffer(
    ownerId: string,
    info: CreatedOffer
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    return db.add(makeOffer(info, ownerId));
  };
}
