import { DatabaseEntity } from "../../../interfaces/database-entity";
import { Offer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";

interface TakeOfferInterface {
  offersDb: DatabaseEntity<Offer, OfferModel>;
}
export default function takeOfferCreator({ offersDb }: TakeOfferInterface) {
  return async function takeOffer(obj: { offerId }): Promise<Required<Offer>> {
    const offer = await offersDb.findById({ id: obj.offerId });

    if (!offer.fetchedData) {
      throw new Error(
        `Such offer is not yet created on the database. Id : ${obj.offerId}`
      );
    }
    return offer.fetchedData;
  };
}
