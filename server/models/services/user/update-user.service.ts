import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { UserExtended } from "../../../../interfaces/user-extended";
import { Tenant } from "../../../../interfaces/tenant";
import { Landlord } from "../../../../interfaces/landlord";
import { Admin } from "../../../../interfaces/admin";
import { UserType } from "../../../../enums/user-type";

export type UpdateUserServiceCreator = {
  tenantsDb: DatabaseEntity<Tenant>;
  landlordsDb: DatabaseEntity<Landlord>;
  adminsDb: DatabaseEntity<Admin>;
};

export default function updateUserService({
  tenantsDb,
  landlordsDb,
  adminsDb,
}: UpdateUserServiceCreator) {
  return async function updateUser(
    user: UserExtended,
    type: UserType
  ): Promise<DatabaseFunction<DatabaseObject<Required<UserExtended>>>> {
    const strategies = {
      [UserType.LANDLORD]: landlordsDb,
      [UserType.TENANT]: tenantsDb,
      [UserType.ADMIN]: adminsDb,
    };

    return await strategies[type].update({
      id: user.id,
      data: user as Required<Tenant & Admin & Landlord>,
    });
  };
}
