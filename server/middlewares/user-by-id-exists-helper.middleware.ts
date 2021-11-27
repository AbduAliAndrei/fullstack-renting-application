import { Request } from "express";
import { HttpException } from "../exceptions/http-exception.exception";
import asyncF from "../../utils/async-f";
import { authVerify } from "../database";
import { takeUser } from "../models/services/user";
import { SecuredUser } from "../../interfaces/user";
import { HttpStatus } from "../enums/http-status";

export default async function userByIdExistsHelperMiddleware(
  req: Request
): Promise<SecuredUser> {
  if (!req.body.userId) {
    throw new HttpException(
      "Access Exception raised: Access denied, userId were not provided. ",
      HttpStatus.FORBIDDEN
    );
  }

  const [data, error] = await asyncF(
    authVerify({ sessionCookie: req.cookies.session ?? "" }),
    false
  );

  if (error) {
    throw new HttpException("Access Exception raised: Unauthenticated. ", 403);
  }

  const [takenUser, errorTakingUser] = await asyncF(takeUser({ id: data }));

  if (errorTakingUser) {
    throw new HttpException(
      "Access Exception raised: Incorrect user id given. ",
      HttpStatus.FORBIDDEN
    );
  }

  return takenUser;
}
