import { HttpRequest } from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import { User } from "../../../interfaces/user";

export default function createUserChecker({
  checkTakeUser,
}: {
  checkTakeUser: ({
    sessionCookie,
  }: {
    sessionCookie: string;
  }) => Promise<Required<User>>;
}) {
  return async function checkAttempt(
    httpRequest: HttpRequest
  ): Promise<Controller<Required<User>>> {
    const {
      source: {},
      ...data
    }: // eslint-disable-next-line @typescript-eslint/ban-types
    { source: {}; sessionCookie: string } = httpRequest.body;
    const [user, userError] = await asyncF<Required<User>>(
      checkTakeUser({ sessionCookie: data.sessionCookie })
    );

    let result!: Controller<Required<User>>;
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
