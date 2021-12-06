import { Offer } from "../../../interfaces/offer";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { postOfferHelper } from "../utils";
import { ImageDest } from "../../../interfaces/image-dest";

export default function createPostOfferImages({
  addImages,
}: {
  addImages({
    offerId,
    images,
  }: {
    offerId: string;
    images: Record<ImageDest, Express.Multer.File[]>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<Required<Offer>>>> {
  return async function postOffer(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<Offer>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<Offer>>>
    > => {
      const images = httpRequest.files;
      const offerId = httpRequest.params["id"];
      return await addImages({ offerId, images });
    };

    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<Offer>>>
    >(postProcess());
    return postOfferHelper(data, error);
  };
}
