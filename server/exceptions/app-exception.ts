import { isObject, isString } from "../../utils/type-checkers";

export default class AppException extends Error {
  constructor(protected readonly msg: string | Record<string, any>) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public initMessage(): void {
    if (isString(this.msg)) {
      this.message = this.msg;
    } else if (
      isObject(this.msg) ||
      isString((this.msg as Record<string, any>).message)
    ) {
      this.message = (this.msg as Record<string, any>).message;
    } else {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(" ");
    }
  }

  public initName(): void {
    this.name = this.constructor.name;
  }
}
