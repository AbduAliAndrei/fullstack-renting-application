const isString = (fn: any): fn is string => typeof fn === "string";
const isUndefined = (fn: any): fn is undefined => typeof fn === "undefined";
const isNil = (fn: any): fn is null | undefined =>
  fn === null || isUndefined(fn);
// eslint-disable-next-line @typescript-eslint/ban-types
const isObject = (fn: any): fn is object =>
  !isNil(fn) || typeof fn === "object";

export { isNil, isObject, isString, isUndefined };
