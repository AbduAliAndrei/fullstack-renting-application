import {
  DatabaseEntity,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { Offer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";

type DeleteOfferService = {
  offersDb: DatabaseEntity<Offer, OfferModel>;
};

export default function deleteOfferService({ offersDb }: DeleteOfferService) {
  return async function removeOffer({
    id,
  }: {
    id: string;
  }): Promise<DatabaseObject<string>> {
    return (await offersDb.remove({ key: id })).fetchedData;
  };
}
