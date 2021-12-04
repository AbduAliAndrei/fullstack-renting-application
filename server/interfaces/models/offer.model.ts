import { AdditionalInfo, GeneralInfo } from "../../../interfaces/offer";

export type OfferModel = {
  getId(): string;
  getOwnerId(): string;
  getGeneralInfo(): GeneralInfo;
  getAdditionalInfo(): Omit<AdditionalInfo, "planLayout"> & {
    planLayout?: Array<string | Blob>;
  };
  getValidUntil(): Date;
  getValidFrom(): Date;
  getExpiresAt(): string;
  getNextOffer(): string;
  getRandomOffer(): string;
};
