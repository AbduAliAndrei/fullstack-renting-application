import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import { Offer, OfferWithUser } from "../../../interfaces/offer";
import asyncF from "../../../utils/async-f";
import { HttpStatus } from "../../enums/http-status";
import { SecuredUser } from "../../../interfaces/user";

export default function createGetOffer({
  getOffer,
  getUser,
}: {
  getOffer: (obj: { ownerId: string }) => Promise<Required<Offer>>;
  getUser: ({ id }: { id: string }) => Promise<Required<SecuredUser>>;
}): (h: HttpRequest) => Promise<Controller<Required<Offer>>> {
  return async function fetchOffer(
    httpRequest: HttpRequest
  ): Promise<Controller<Required<Offer>>> {
    const fetchProcess = async (): Promise<Required<Offer>> => {
      const offerId = httpRequest.params["id"];
      return await getOffer({
        ownerId: offerId,
      });
    };
    const [data, error] = await asyncF<Required<Offer>>(fetchProcess());

    if (httpRequest.query["takeOwner"]) {
      (data as OfferWithUser).owner = await getUser({
        id: data.ownerId,
      });
    }
    let result!: Controller<Required<Offer>>;
    if (error) {
      result = {
        headers: {
          "Content-type": "application/json",
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
          "Last-Modified": new Date().toUTCString(),
        },
        statusCode: HttpStatus.OK,
        body: { res: data },
      };
    }
    return result;
  };
}
