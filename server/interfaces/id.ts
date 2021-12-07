import ciud from "cuid";

export type CustomId = {
  makeId: typeof ciud;
  isValidId: (cuid: string) => boolean;
};
