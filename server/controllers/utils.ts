import { HttpRequest } from "../interfaces/http-request";
import AppException from "../exceptions/app-exception";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import { Offer } from "../../interfaces/offer";
import Controller from "../interfaces/controller";
import { MultiselectSortBy } from "../interfaces/databases/generic-database-entity";
import { ParsedQs } from "qs";
import parseJSONObject from "../../utils/parse-json";
import { isString } from "../../utils/type-checkers";

export async function requestControllerHandler<T>(
  httpRequest: HttpRequest,
  callback: (...args: unknown[]) => Promise<T>,
  keys: string[],
  data?: Record<string, any>
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

  if (data) {
    Object.keys(data).map((key) => {
      obj[key] = data[key];
    });
  }

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

export function parseOfferQueryToString(
  queryLiteral: string | ParsedQs | string[] | ParsedQs[] | undefined
): undefined | MultiselectSortBy {
  if (!queryLiteral) {
    return;
  }

  try {
    return parseJSONObject(queryLiteral);
  } catch (e) {
    if (isString(queryLiteral) && queryLiteral.includes(",")) {
      return queryLiteral.split(",");
    } else if (isString(queryLiteral)) {
      return [queryLiteral];
    } else {
      return [(queryLiteral as ParsedQs).toString()];
    }
  }
}
