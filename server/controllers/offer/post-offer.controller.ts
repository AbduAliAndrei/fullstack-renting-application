import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { Offer } from "../../../interfaces/offer";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";

export default function createPostOffer({
  createOffer,
}: {
  createOffer: (
    offerInfo: Offer
  ) => Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<Required<Offer>>>> {
  return async function postOffer(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<Offer>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<Offer>>>
    > => {
      const { source = {}, offer } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["Offer-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }
      return await createOffer({
        ...offer,
      });
    };
    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<Offer>>>
    >(postProcess());
    let result!: Controller<DatabaseObject<Required<Offer>>>;
    if (error) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: (error as { message: string }).message,
        },
      };
    } else {
      result = {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(data.fetchedData.writeTime).toUTCString(),
        },
        statusCode: 201,
        body: { res: data.fetchedData },
      };
    }
    return result;
  };
}
