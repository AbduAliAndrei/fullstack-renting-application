import createOffersController from "./get-offers.controller";
import offerService from "../../models/services/offer";
import createPostOffer from "./post-offer.controller";
import createUpdateOffer from "./update-offer.controller";
import createDeleteOffer from "./delete-offer.controller";
import createGetOffer from "./get-offer.controller";

const getOffer = createGetOffer({
  getOffer: offerService.takeOffer,
});
const deleteOffer = createDeleteOffer({
  deleteOffer: offerService.deleteOffer,
});
const updateOffer = createUpdateOffer({
  putOffer: offerService.updateOffer,
});
const createOffer = createPostOffer({
  createOffer: offerService.createOffer,
});
const getOffers = createOffersController({
  getOffers: offerService.takeOffers,
});

const offerController = Object.freeze({
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  getOffer,
});

export default offerController;
