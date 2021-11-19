import { Landlord } from "../../../interfaces/landlord";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http-request";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";

export default function createPostLandlord({
  createLandlord,
}: {
  createLandlord: (
    landlordInfo: Landlord
  ) => Promise<DatabaseFunction<DatabaseObject<Required<Landlord>>>>;
}): (
  h: HttpRequest
) => Promise<Controller<DatabaseObject<Required<Landlord>>>> {
  return async function postLandlord(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<Landlord>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<Landlord>>>
    > => {
      const { source = {}, user } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }

      return await createLandlord({
        ...user,
        source,
      });
    };

    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<Landlord>>>
    >(postProcess());
    let result!: Controller<DatabaseObject<Required<Landlord>>>;
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
          "Last-Modified": new Date(data.data.writeTime).toUTCString(),
        },
        statusCode: 201,
        body: { res: data.data },
      };
    }

    return result;
  };
}
