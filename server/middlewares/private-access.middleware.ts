import { Request, Response } from "express";
import { PrivateRoutes } from "../enums/private-routes";

// TODO: create HttpException on error case
export default function privateAccessMiddleware(
  req: Request,
  res: Response
): boolean {
  const privateRoutes = [...Object.values(PrivateRoutes).map((i) => String(i))];
  if (!privateRoutes.includes(req.url)) {
    res.status(403);
    res.json({
      error: "Access denied. You are not logged in",
    });

    return false;
  }

  return true;
}
