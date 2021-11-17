import { UserModel } from "./user.type";

export type TenantModel = UserModel & { getIdType(): string };
