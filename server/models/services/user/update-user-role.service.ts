import { SecuredUser } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.model";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { UserType } from "../../../../enums/user-type";
import { DatabaseUserEntity } from "../../../interfaces/databases/user-database-entity";

export function updateUserRoleService({
  db,
}: {
  db: DatabaseUserEntity<SecuredUser, UserModel>;
}) {
  return async function updateUserRoleService({
    id,
    role,
  }: {
    id: string;
    role: UserType;
  }): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    return await db.updateRole({ id, role });
  };
}
