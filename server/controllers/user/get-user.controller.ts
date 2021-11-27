import { HttpStatus } from "../../enums/http-status";
import asyncF from "../../../utils/async-f";
import { SecuredUser } from "../../../interfaces/user";
import Controller from "../../interfaces/controller";
import { HttpRequest } from "../../interfaces/http-request";

export default function createGetUser({
  getUser,
}: {
  getUser: (obj: { id: string }) => Promise<Required<SecuredUser>>;
}): (h: HttpRequest) => Promise<Controller<Required<SecuredUser>>> {
  return async function fetchUser(
    httpRequest: HttpRequest
  ): Promise<Controller<Required<SecuredUser>>> {
    const fetchProcess = async (): Promise<Required<SecuredUser>> => {
      const userId = httpRequest.headers["id"];
      return await getUser({
        id: userId,
      });
    };
    const [data, error] = await asyncF<Required<SecuredUser>>(fetchProcess());

    let result!: Controller<Required<SecuredUser>>;
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
