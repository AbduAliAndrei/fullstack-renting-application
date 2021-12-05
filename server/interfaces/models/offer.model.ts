import { AdditionalInfo, GeneralInfo } from "../../../interfaces/offer";

export type OfferModel = {
  getId(): string;
  getOwnerId(): string;
  getImages(): Array<string | Blob>;
  getGeneralInfo(): GeneralInfo;
  getAdditionalInfo(): Omit<AdditionalInfo, "planLayout"> & {
    planLayout?: Array<string | Blob>;
  };
  getValidUntil(): Date;
  getValidFrom(): Date;
  getExpiresAt(): Date;
  getRandomOffer(): string;
};
