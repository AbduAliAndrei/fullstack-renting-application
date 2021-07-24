export interface Tenant {
  idType: string; //Passport or ID card
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  picture: string;
  gender: string;
  id?: string;
  userName?: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}