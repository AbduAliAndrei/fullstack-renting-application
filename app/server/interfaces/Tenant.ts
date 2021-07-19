export interface TenantResponse extends TenantRequest {
  id: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantRequest {
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