import takeOfferCreator from "./take-offer.service";
import { offersDb } from "../../../database";

const createOffer = takeOfferCreator({ offersDb });

const offerService = Object.freeze({
  createOffer,
});

export default offerService;
export { offerService };
