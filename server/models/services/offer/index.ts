import takeOfferCreator from "./take-offer.service";
import { offersDb } from "../../../database";
import { makeOffer } from "../../entities/offer";
import deleteOfferService from "./delete-offer.service";
import takeOffersCreator from "./take-offers.service";
import updateOfferCreator from "./update-offer.service";
import createOfferCreator from "./create-offer.service";
import addImagesCreator from "./add-images.service";

const createOffer = createOfferCreator({ db: offersDb, makeOffer });
const deleteOffer = deleteOfferService({ offersDb });
const takeOffers = takeOffersCreator({ offersDb });
const takeOffer = takeOfferCreator({ offersDb });
const updateOffer = updateOfferCreator({ offersDb });
const addImagesToOffer = addImagesCreator({ offersDb });

const offerService = Object.freeze({
  createOffer,
  deleteOffer,
  takeOffers,
  takeOffer,
  updateOffer,
  addImagesToOffer,
});

export default offerService;
export {
  offerService,
  takeOffer,
  updateOffer,
  takeOffers,
  deleteOffer,
  createOffer,
  addImagesToOffer,
};
