import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { Offer, CreatedOffer } from "../../../interfaces/offer";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { postOfferHelper } from "../utils";

export default function createPostOffer({
  createOffer,
}: {
  createOffer(
    ownerId: string,
    offer: CreatedOffer
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<Required<Offer>>>> {
  return async function postOffer(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<Offer>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<Offer>>>
    > => {
      const { source = {}, offer, ownerId } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["Offer-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }
      return await createOffer(ownerId, offer);
    };

    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<Offer>>>
    >(postProcess());
    return postOfferHelper(data, error);
  };
}
