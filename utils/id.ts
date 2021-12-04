import ciud from "cuid";
import { CustomId } from "../server/interfaces/id";

const Id: CustomId = Object.freeze({
  makeId: ciud,
  isValidId: ciud.isCuid,
});

export default Id;
