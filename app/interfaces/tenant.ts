import {User} from "./user";
import {Privilege} from "./privilege";

export interface Tenant extends User, Required<Pick<Privilege, "idType" >> {}