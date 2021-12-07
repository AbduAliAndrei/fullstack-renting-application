import AppException from "./app-exception";

export default class FalsyValueException extends AppException {
  constructor(protected readonly msg: string | Record<string, any>) {
    super(msg);
  }
}
