import { Request, Response } from "express";
import { HttpStatus } from "../enums/http-status";
import { HttpException } from "../exceptions/http-exception.exception";
import Controller from "../interfaces/controller";
import { HttpRequest } from "../interfaces/http-request";

// TODO: Pass as second argument guard and handle exception in catch part
export default function createExpressCallback<T>(
  controller: (h: HttpRequest) => Promise<Controller<T>>,
  guard: (
    req: Request,
    res: Response
  ) => Promise<boolean> = (): Promise<boolean> =>
    new Promise((resolve) => resolve(true))
): (req: Request, res: Response) => void {
  return (req: Request, res: Response): void => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
      cookies: req.cookies,
    };
    guard(req, res)
      .then(() => {
        ``;
        controller(httpRequest)
          .then((httpResponse) => {
            if (httpResponse.headers) {
              res.set(httpResponse.headers);
            }
            if (httpResponse.cookie) {
              res.cookie(
                httpResponse.cookie.name,
                httpResponse.cookie.value,
                httpResponse.cookie.options
              );
            }
            res.type("json");
            res.status(httpResponse.statusCode).send(httpResponse.body);
          })
          .catch((e) => {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send(`An unknown error occurred. Error message: ${e}`);
          });
      })
      .catch((e) => {
        if (e instanceof HttpException) {
          res.type("json");
          res.status(e.getStatus()).send(e.getResponse());
        } else {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(`An unknown error occurred. Error message: ${e}`);
        }
      });
  };
}
