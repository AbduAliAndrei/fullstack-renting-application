import { DatabaseOfferEntity } from "../../../interfaces/databases/offer-database-entity";
import { Offer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";
import { DatabaseFunction } from "../../../interfaces/database-entity";
import FalsyValueException from "../../../exceptions/falsy-value-exception";

interface TakeOffersInterface {
  offersDb: DatabaseOfferEntity<Offer, OfferModel>;
}

// TODO: Create filtering for take offers
export default function takeOffersCreator({ offersDb }: TakeOffersInterface) {
  return async function takeOffers(): Promise<
    DatabaseFunction<Required<Offer[]>>
  > {
    const offers = await offersDb.findAll({});
    if (!offers.fetchedData) {
      throw new FalsyValueException("Offers not found!");
    }
    return offers;
  };
}
