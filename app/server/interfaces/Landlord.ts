export default interface Landlord {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  offers_list: [];
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  bio: string;
  trusted: boolean;
  picture: string;
}
