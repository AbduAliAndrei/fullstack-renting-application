import { User } from "./user";
import { Privilege } from "./privilege";
import { Merge } from "../ts-utils/merge";

export type Tenant = Merge<User, Required<Pick<Privilege, "idType">>>;
