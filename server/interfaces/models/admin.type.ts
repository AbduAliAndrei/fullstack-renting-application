import { UserModel } from "./user.type";

export type AdminModel = UserModel & { isAdmin(): boolean };
