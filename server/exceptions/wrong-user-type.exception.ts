import AppException from "./app-exception";
import { UserType } from "../../enums/user-type";

export default class WrongUserTypeException extends AppException {
  constructor(
    protected currentUserType: UserType,
    protected expectedUserType: UserType
  ) {
    super(
      `Incorrect user type. Excepted ${expectedUserType}, got ${currentUserType}`
    );
  }
}
