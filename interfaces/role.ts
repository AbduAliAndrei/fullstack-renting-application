export type Role = Admin | Landlord | Tenant;

type Admin = {
  admin: boolean;
};

type Landlord = {
  offerList: unknown[];
  trusted: boolean;
  idType: string;
};

type Tenant = Pick<Landlord, "idType">;
