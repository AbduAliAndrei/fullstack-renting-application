import { HttpRequest } from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import { SecuredUser } from "../../../interfaces/user";
import Controller from "../../interfaces/controller";
import { HttpStatus } from "../../enums/http-status";

export default function createUserChecker({
  checkTakeUser,
}: {
  checkTakeUser: ({
    sessionCookie,
  }: {
    sessionCookie: string;
  }) => Promise<Required<SecuredUser>>;
}) {
  return async function checkAttempt(
    httpRequest: HttpRequest
  ): Promise<Controller<Required<SecuredUser>>> {
    const [user, userError] = await asyncF<Required<SecuredUser>>(
      checkTakeUser({ sessionCookie: httpRequest.cookies.session })
    );

    let result!: Controller<Required<SecuredUser>>;
    if (userError) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.NO_CONTENT,
        body: {
          res: {} as Required<SecuredUser>,
        },
      };
    } else {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.OK,
        body: {
          res: user,
        },
      };
    }
    return result;
  };
}
