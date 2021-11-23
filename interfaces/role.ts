import { UserType } from "../enums/user-type";

export type Role = Admin | Landlord | Tenant;

type Admin = {
  admin: boolean;
  role: UserType.ADMIN;
};

type Landlord = {
  offerList: unknown[];
  trusted: boolean;
  idType: string;
  role: UserType.LANDLORD;
};

type Tenant = Pick<Landlord, "idType"> & {
  role: UserType.TENANT;
};
