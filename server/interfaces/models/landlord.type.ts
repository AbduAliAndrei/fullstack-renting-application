import { UserModel } from "./user.type";

export type LandlordModel = UserModel & {
  getOffersList(): [];
  isTrusted(): boolean;
};
