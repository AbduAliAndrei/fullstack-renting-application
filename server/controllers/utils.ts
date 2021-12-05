import { HttpRequest } from "../interfaces/http-request";
import AppException from "../exceptions/app-exception";

export async function requestControllerHandler<T>(
  httpRequest: HttpRequest,
  callback: (...args: unknown[]) => Promise<T>,
  keys: string[]
): Promise<T> {
  if (callback.length > 1) {
    throw new AppException(
      `Wrong argument number. Excepted 1, got ${callback.length}`
    );
  }
  const obj: Record<string, unknown> = {};
  keys.map((key) => {
    if (httpRequest.body[key]) {
      obj[key] = httpRequest.body[key];
    } else if (httpRequest.params[key]) {
      obj[key] = httpRequest.params[key];
    }
  });

  return await callback(obj);
}
