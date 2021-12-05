import { UserType } from "../enums/user-type";

export type Role = Admin | Landlord | Tenant;

type Admin = {
  admin: boolean;
  role: UserType.ADMIN;
};

export type Landlord = {
  offerList: string[];
  trusted: boolean;
  idType: string;
  role: UserType.LANDLORD;
};

type Tenant = Pick<Landlord, "idType"> & {
  role: UserType.TENANT;
};
