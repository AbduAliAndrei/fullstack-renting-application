import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { Tenant } from "../../../../interfaces/tenant";
import { Landlord } from "../../../../interfaces/landlord";
import { Admin } from "../../../../interfaces/admin";
import createAddTenant from "./tenant/create-tenant.service";
import createAddLandlord from "./landlord/create-landlord.service";
import createAddAdmin from "./admin/create-admin.service";
import { UserType } from "../../../../enums/use-type";
import { UserExtended } from "../../../../interfaces/user-extended";

export default function createUserCreator({
  db,
}: {
  db: DatabaseEntity<Tenant | Landlord | Admin>;
}) {
  return async function createUser(
    info: Tenant | Landlord | Admin,
    strategy: UserType
  ): Promise<
    (
      tenantInfo: UserExtended
    ) => Promise<DatabaseFunction<DatabaseObject<Required<UserExtended>>>>
  > {
    const strategies = {
      [UserType.TENANT]: createAddTenant({
        tenantsDb: db as DatabaseEntity<Tenant>,
      }),
      [UserType.LANDLORD]: createAddLandlord({
        landlordsDb: db as DatabaseEntity<Landlord>,
      }),
      [UserType.ADMIN]: createAddAdmin({
        adminsDb: db as DatabaseEntity<Admin>,
      }),
    };

    return strategies[strategy];
  };
}
