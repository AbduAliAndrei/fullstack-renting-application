import {
  DatabaseEntity,
  DatabaseFunction,
} from "../../../interfaces/database-entity";
import { Tenant } from "../../../../interfaces/tenant";
import { Landlord } from "../../../../interfaces/landlord";
import { UserType } from "../../../../enums/use-type";
import { UserExtended } from "../../../../interfaces/user-extended";

interface TakeUserInterface {
  tenantsDb: DatabaseEntity<Tenant>;
  landlordsDb: DatabaseEntity<Landlord>;
}

export default function takeUserCreator({
  tenantsDb,
  landlordsDb,
}: TakeUserInterface) {
  return async function takeUser(obj: {
    id: string;
    type: UserType;
  }): Promise<Required<UserExtended>> {
    const strategies = {
      [UserType.LANDLORD]: async (
        id: string
      ): Promise<DatabaseFunction<Required<Landlord>> & { id?: string }> =>
        landlordsDb.findById({ id }),
      [UserType.TENANT]: async (
        id: string
      ): Promise<DatabaseFunction<Required<Tenant>> & { id?: string }> =>
        tenantsDb.findById({ id }),
    };
    const user = await strategies[obj.type](obj.id);

    if (!user.data) {
      throw new Error(
        `Such user is not yet created on the database. Id: ${obj.id}`
      );
    }

    return user.data;
  };
}
