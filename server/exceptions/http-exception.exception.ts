import { isObject, isString } from "../../utils/type-checkers";

export class HttpException extends Error {
  constructor(
    protected readonly response: string | Record<string, any>,
    protected readonly status: number
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public initMessage(): void {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (
      isObject(this.response) ||
      isString((this.response as Record<string, any>).message)
    ) {
      this.message = (this.response as Record<string, any>).message;
    } else {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(" ");
    }
  }

  public initName(): void {
    this.name = this.constructor.name;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public getResponse(): string | object {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }

  public static createBody(
    // eslint-disable-next-line @typescript-eslint/ban-types
    objectOrError: object | string,
    description?: string,
    statusCode?: number
  ): Record<string, any> {
    if (!objectOrError) {
      return { statusCode, message: description };
    }

    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}
