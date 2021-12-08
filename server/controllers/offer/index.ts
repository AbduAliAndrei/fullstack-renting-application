import createOffersController from "./get-offers.controller";
import offerService from "../../models/services/offer";
import userService from "../../models/services/user";
import createPostOffer from "./post-offer.controller";
import createUpdateOffer from "./update-offer.controller";
import createDeleteOffer from "./delete-offer.controller";
import createGetOffer from "./get-offer.controller";
import createPostOfferImages from "./post-offer-images.controller";

const getOffer = createGetOffer({
  getOffer: offerService.takeOffer,
  getUser: userService.takeUser,
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
const addImages = createPostOfferImages({
  addImages: offerService.addImagesToOffer,
});

const getOffers = createOffersController({
  getOffers: offerService.takeOffers,
  getUser: userService.takeUser,
});

const offerController = Object.freeze({
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  getOffer,
  addImages,
});

export default offerController;
