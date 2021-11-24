import { Role } from "./role";

export type SecuredUser = Omit<User, "password">;

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName?: string;
  id?: string;
  verified: boolean;
  gender: string;
  picture: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: Role;
}
