import { Admin } from "../../../interfaces/admin";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http-request";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";

export default function createPostAdmin({
  createAdmin,
}: {
  createAdmin: (
    adminInfo: Admin
  ) => Promise<DatabaseFunction<DatabaseObject<Required<Admin>>>>;
}): (h: HttpRequest) => Promise<Controller<DatabaseObject<Required<Admin>>>> {
  return async function postAdmin(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseObject<Required<Admin>>>> {
    const postProcess = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<Admin>>>
    > => {
      const { source = {}, user } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }
      return await createAdmin({
        ...user,
        source,
      });
    };

    const [data, error] = await asyncF<
      DatabaseFunction<DatabaseObject<Required<Admin>>>
    >(postProcess());
    let result!: Controller<DatabaseObject<Required<Admin>>>;
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
