import { HttpRequest } from "../interfaces/http-request";
import AppException from "../exceptions/app-exception";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import { Offer } from "../../interfaces/offer";
import Controller from "../interfaces/controller";

export async function requestControllerHandler<T>(
  httpRequest: HttpRequest,
  callback: (...args: unknown[]) => Promise<T>,
  keys: string[]
): Promise<T> {
  if (callback.length > 1) {
    throw new AppException(
      `Wrong argument number. Excepted 1, got ${callback.length}`
    );
  }
  const obj: Record<string, unknown> = {};
  keys.map((key) => {
    if (httpRequest.body[key]) {
      obj[key] = httpRequest.body[key];
    } else if (httpRequest.params[key]) {
      obj[key] = httpRequest.params[key];
    }
  });

  return await callback(obj);
}

export async function postOfferHelper(
  data: DatabaseFunction<DatabaseObject<Required<Offer>>>,
  error: unknown
): Promise<Controller<DatabaseObject<Required<Offer>>>> {
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
}
