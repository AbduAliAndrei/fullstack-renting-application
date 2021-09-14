import {User} from "./user";

export interface Tenant extends User {
  idType: string; //Passport or ID card
}