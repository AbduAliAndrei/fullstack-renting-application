import { HttpRequest } from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import { SecuredUser } from "../../../interfaces/user";
import Controller from "../../interfaces/controller";

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
        statusCode: 404,
        body: {
          error: userError as string,
        },
      };
    } else {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          res: user,
        },
      };
    }
    return result;
  };
}
