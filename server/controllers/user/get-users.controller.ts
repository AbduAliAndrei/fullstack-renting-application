import { HttpStatus } from "../../enums/http-status";
import asyncF from "../../../utils/async-f";
import { SecuredUser, User } from "../../../interfaces/user";
import { DatabaseFunction } from "../../interfaces/database-entity";
import Controller from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http-request";

export default function createGetUsers({
  getUsers,
}: {
  getUsers: () => Promise<DatabaseFunction<Required<SecuredUser[]>>>;
}): (h: HttpRequest) => Promise<Controller<Required<SecuredUser[]>>> {
  return async function fetchUsers(
    httpRequest: HttpRequest
  ): Promise<Controller<Required<SecuredUser[]>>> {
    const fetchAllProcess = async (): Promise<
      DatabaseFunction<Required<SecuredUser[]>>
    > => {
      const { source = {} } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referer = httpRequest.headers["Referer"];
      }
      return await getUsers();
    };
    const [data, error] = await asyncF<
      DatabaseFunction<Required<SecuredUser[]>>
    >(fetchAllProcess());
    let result!: Controller<Required<SecuredUser[]>>;
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
        body: { res: data.fetchedData },
      };
    }
    return result;
  };
}
