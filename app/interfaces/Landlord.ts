import {User} from "./User";

export default interface Landlord extends User {
  offersList: [];
  trusted: boolean;
}
