import { UserType } from "../../../../enums/user-type";
import {
  DatabaseEntity,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { Tenant } from "../../../../interfaces/tenant";
import { Landlord } from "../../../../interfaces/landlord";
import { Admin } from "../../../../interfaces/admin";

export type DeleteUserService = {
  tenantsDb: DatabaseEntity<Tenant>;
  landlordsDb: DatabaseEntity<Landlord>;
  adminsDb: DatabaseEntity<Admin>;
};

export default function deleteUserService({
  tenantsDb,
  landlordsDb,
  adminsDb,
}: DeleteUserService) {
  return async function deleteUser(
    id: string,
    type: UserType
  ): Promise<DatabaseObject<string>> {
    const strategies = {
      [UserType.LANDLORD]: landlordsDb,
      [UserType.TENANT]: tenantsDb,
      [UserType.ADMIN]: adminsDb,
    };

    const removeRes = await strategies[type].remove({ id });
    if (!removeRes.data) {
      throw new Error("User was not deleted. Uncaught error.");
    }
    return removeRes.data;
  };
}
