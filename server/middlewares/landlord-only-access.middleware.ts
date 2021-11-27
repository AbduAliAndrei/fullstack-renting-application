import { Request } from "express";
import { HttpException } from "../exceptions/http-exception.exception";
import { UserType } from "../../enums/user-type";
import userByIdExistsHelperMiddleware from "./user-by-id-exists-helper.middleware";
import { HttpStatus } from "../enums/http-status";

export default async function landlordOnlyAccessMiddleware(
  req: Request
): Promise<boolean> {
  const takenUser = await userByIdExistsHelperMiddleware(req);
  if (
    takenUser.role.role === UserType.ADMIN ||
    takenUser.role.role === UserType.LANDLORD
  ) {
    return true;
  }

  throw new HttpException(
    `Access Exception raised: . ${takenUser.role.role} doesnt have required rights`,
    HttpStatus.FORBIDDEN
  );
}
