import { Tenant } from "./tenant";
import { Landlord } from "./landlord";
import { Admin } from "./admin";

export type UserExtended = Tenant | Landlord | Admin;
