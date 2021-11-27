import { Request, Response } from "express";
import { PrivateRoutes } from "../enums/private-routes";
import { HttpException } from "../exceptions/http-exception.exception";

// TODO: create HttpException on error case
export default function privateAccessMiddleware(
  req: Request,
  res: Response
): boolean {
  const privateRoutes = [...Object.values(PrivateRoutes).map((i) => String(i))];
  if (!privateRoutes.includes(req.url)) {
    const error =
      "HttpException raised: Access denied, access to private route not allowed";
    throw new HttpException(error, 403);
  }
  return true;
}
