import {User} from "./user";

export interface Landlord extends User {
  offersList: [];
  trusted: boolean;
}
