import { UserType } from "../enums/user-type";

const isString = (fn: any): fn is string => typeof fn === "string";
const isUndefined = (fn: any): fn is undefined => typeof fn === "undefined";
const isNil = (fn: any): fn is null | undefined =>
  fn === null || isUndefined(fn);
// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (fn: any): fn is object =>
  !isNil(fn) || typeof fn === "object";

const isUserType = (fn: any): fn is UserType =>
  fn === UserType.TENANT || fn === UserType.ADMIN || fn === UserType.LANDLORD;

export { isNil, isObject, isString, isUndefined, isUserType };
