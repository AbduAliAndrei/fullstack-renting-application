import createOffersController from "./get-offers.controller";
import offerService from "../../models/services/offer";

const getOffers = createOffersController({
  getOffers: offerService.takeOffers,
});

const offerController = Object.freeze({
  getOffers,
});

export default offerController;
