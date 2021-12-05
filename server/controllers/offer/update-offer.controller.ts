import { UpdatedOffer } from "../../../interfaces/offer";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { HttpStatus } from "../../enums/http-status";

export default function createUpdateOffer({
  putOffer,
}: {
  putOffer: (
    offerInfo: UpdatedOffer,
    offerId: string
  ) => Promise<DatabaseFunction<DatabaseObject<Required<UpdatedOffer>>>>;
}): (
  h: HttpRequest
) => Promise<Controller<DatabaseObject<Required<UpdatedOffer>>>> {
  return async function updateOffer(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<UpdatedOffer>>>> {
    const updateProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<UpdatedOffer>>>
    > => {
      const { source = {}, offer, offerId } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["Offer-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }
      return await putOffer(
        {
          ...offer,
        },
        offerId
      );
    };
    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<UpdatedOffer>>>
    >(updateProcess());
    let result!: Controller<DatabaseObject<Required<UpdatedOffer>>>;
    if (error) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.BAD_REQUEST,
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
        statusCode: HttpStatus.OK,
        body: { res: data.fetchedData },
      };
    }
    return result;
  };
}
