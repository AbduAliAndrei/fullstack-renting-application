import {User} from "./User";

export interface Tenant extends User {
  idType: string; //Passport or ID card
}