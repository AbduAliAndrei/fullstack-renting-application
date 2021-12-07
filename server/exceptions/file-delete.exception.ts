import AppException from "./app-exception";

export default class FileDeleteException extends AppException {
  constructor(protected readonly msg: string | Record<string, any>) {
    super(msg);
    this.initMessage();
    this.initName();
  }
}
