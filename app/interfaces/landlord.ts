import {User} from "./user";
import {Privilege} from "./privilege";

export default interface Landlord extends User, Required<Pick<Privilege, "offerList" | "trusted" >> {};