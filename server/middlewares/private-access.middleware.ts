import { Request } from "express";
import { PrivateRoutes } from "../enums/private-routes";
import { HttpException } from "../exceptions/http-exception.exception";
import asyncF from "../../utils/async-f";
import { authVerify } from "../database";

export default async function privateAccessMiddleware(
  req: Request
): Promise<boolean> {
  const privateRoutes = [...Object.values(PrivateRoutes).map((i) => String(i))];
  const [, error] = await asyncF(
    authVerify({ sessionCookie: req.cookies.session ?? "" }),
    true
  );
  if (!privateRoutes.includes(req.url) || error) {
    const error =
      "Access Exception raised: Access denied, access to private route not allowed. Please check your access route or authentication";
    const exception = new HttpException(error, 403);
    exception.initName();
    exception.initMessage();
    throw exception;
  }
  return true;
}
