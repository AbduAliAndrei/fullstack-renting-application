import { AdditionalInfo, GeneralInfo } from "../../../interfaces/offer";

export type OfferModel = {
  getOwnerId(): string;
  getGeneralInfo(): GeneralInfo;
  getAdditionalInfo(): AdditionalInfo;
  getValidUntil(): Date;
  getValidFrom(): Date;
  getExpiresAt(): string;
  getNextOffer(): string;
  getRandomOffer(): string;
};
