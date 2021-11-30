import { Request } from "express";
import currentUserOnlyAccessMiddleware from "./current-user-only-access.middleware";
import landlordOnlyAccessMiddleware from "./landlord-only-access.middleware";

export default async function currentLandlordOnlyAccessMiddleware(
  req: Request
): Promise<boolean> {
  const currentAccessMiddleware = await currentUserOnlyAccessMiddleware(req);
  const landlordAccessMiddleware = await landlordOnlyAccessMiddleware(req);
  return currentAccessMiddleware || landlordAccessMiddleware;
}
