import {User} from "./user";
import {Privilege} from "./privilege";
import {Merge} from "../ts-utils/merge";

export type Landlord = Merge<User, Required<Pick<Privilege, "offersList" | "trusted">>>