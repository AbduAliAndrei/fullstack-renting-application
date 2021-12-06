import { CustomId } from "../../../interfaces/id";
import add from "date-fns/add";
import {
  AdditionalInfo,
  Offer,
  CreatedOffer,
} from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";

export default function buildMakeOffer({
  Id,
  validate,
}: {
  Id: CustomId;
  validate?: any;
}) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-empty-function
  return function makeOffer(
    { generalInfo, additionalInfo, validUntil, validFrom }: CreatedOffer,
    ownerId: string
  ): OfferModel {
    if (!validUntil) {
      throw new Error(
        "Offer must have a validity period! : End date not specified"
      );
    }
    if (!validFrom) {
      throw new Error(
        "Offer must have an expiry date! : Start date not specified"
      );
    }

    if (!additionalInfo) {
      throw new Error("Offer must have additional info!");
    }

    if (!generalInfo) {
      throw new Error("Offer must have general info!");
    }

    if (!ownerId) {
      throw new Error("Offer id must be presented");
    }

    return Object.freeze({
      getId: () => Id.makeId(),
      getOwnerId: () => ownerId,
      getGeneralInfo: () => generalInfo,
      getAdditionalInfo: () => additionalInfo,
      getValidUntil: () => validUntil,
      getValidFrom: () => validFrom,
      getImages: () => [],
      getRandomOffer: () => null,
      getOwner: () => null,
      getExpiresAt: () => add(new Date(), { months: 6 }) as Date,
    });
  };
}

export function toOfferFromModel(offerModel: OfferModel): Required<Offer> {
  return {
    id: offerModel.getId(),
    ownerId: offerModel.getOwnerId(),
    generalInfo: offerModel.getGeneralInfo(),
    additionalInfo: offerModel.getAdditionalInfo() as AdditionalInfo,
    validUntil: offerModel.getValidUntil(),
    validFrom: offerModel.getValidFrom(),
    expiresAt: offerModel.getExpiresAt(),
    images: offerModel.getImages() as string[],
    randomOffer: offerModel.getRandomOffer(),
  };
}
