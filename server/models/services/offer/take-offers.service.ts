import { DatabaseOfferEntity } from "../../../interfaces/databases/offer-database-entity";
import { Offer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";
import { DatabaseFunction } from "../../../interfaces/database-entity";
import FalsyValueException from "../../../exceptions/falsy-value-exception";
import { FilterBy } from "../../../interfaces/databases/generic-database-entity";
import { AllowedFilterOfferKeys } from "../../../../enums/allowed-offer-keys";
import isEmpty from "lodash/isEmpty";

interface TakeOffersInterface {
  offersDb: DatabaseOfferEntity<Offer, OfferModel>;
}

export default function takeOffersCreator({ offersDb }: TakeOffersInterface) {
  return async function takeOffers({
    filterBy,
  }: {
    filterBy?: FilterBy<AllowedFilterOfferKeys>;
  }): Promise<DatabaseFunction<Required<Offer[]>>> {
    const offers =
      filterBy && !isEmpty(filterBy)
        ? await offersDb.findAllByKeys({ filter: filterBy })
        : await offersDb.findAll({});
    if (!offers.fetchedData) {
      throw new FalsyValueException("Offers not found!");
    }
    return offers;
  };
}
