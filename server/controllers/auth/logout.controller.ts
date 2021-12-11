import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { HttpStatus } from "../../enums/http-status";

export default function createLogout({
  logoutService,
}: {
  logoutService: () => Promise<boolean>;
}) {
  return async function logout(): Promise<
    Controller<Required<boolean | unknown>>
  > {
    const [, error] = await asyncF(logoutService());

    if (error) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.NOT_FOUND,
        body: {
          res: error,
        },
      };
    }

    return {
      cookie: { name: "session", value: "", options: {} },
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: HttpStatus.MOVED_PERMANENTLY,
      body: {
        res: true,
      },
    };
  };
}
