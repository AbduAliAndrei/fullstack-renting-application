import { Privilege } from "./privilege";
import { User } from "./user";
import { Merge } from "../ts-utils/merge";

export type Admin = Merge<User, Required<Pick<Privilege, "admin">>>;
