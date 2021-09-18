import {User} from "./user";

export default interface Landlord extends User {
  offersList: [];
  trusted: boolean;
}
