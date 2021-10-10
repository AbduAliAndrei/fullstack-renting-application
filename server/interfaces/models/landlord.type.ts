import { UserModel } from "./user.type";

export type LandlordType = UserModel & {
  getOfferList(): [];
  isTrusted(): boolean;
};
