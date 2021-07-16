export default interface Tenant {
  idType: string; //Passport or ID card
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  bio?: string;
  gender: string;
  picture: string;
}