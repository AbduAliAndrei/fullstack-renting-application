import takeOfferCreator from "./take-offer.service";
import { offersDb } from "../../../database";
import deleteOfferService from "./delete-offer.service";
import takeOffersCreator from "./take-offers.service";
import updateOfferCreator from "./update-offer.service";

const createOffer = takeOfferCreator({ offersDb });
const deleteOffer = deleteOfferService({ offersDb });
const takeOffers = takeOffersCreator({ offersDb });
const takeOffer = takeOfferCreator({ offersDb });
const updateOffer = updateOfferCreator({ offersDb });

const offerService = Object.freeze({
  createOffer,
  deleteOffer,
  takeOffers,
  takeOffer,
  updateOffer,
});

export default offerService;
export { offerService, takeOffer, updateOffer, takeOffers, deleteOffer };
