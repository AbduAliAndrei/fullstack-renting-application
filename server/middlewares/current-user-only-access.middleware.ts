import { Request } from "express";
import { HttpException } from "../exceptions/http-exception.exception";
import { UserType } from "../../enums/user-type";
import userByIdExistsHelperMiddleware from "./user-by-id-exists-helper.middleware";

export default async function currentUserOnlyAccessMiddleware(
  req: Request
): Promise<boolean> {
  const takenUser = await userByIdExistsHelperMiddleware(req);

  if (takenUser.role.role === UserType.ADMIN) {
    return true;
  }

  if (takenUser.id !== req.body.userId) {
    throw new HttpException(
      `Access Exception raised: . ${takenUser.role.role} doesnt have required rights`,
      403
    );
  }

  return true;
}
