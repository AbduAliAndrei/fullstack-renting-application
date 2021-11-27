import { SecuredUser } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.type";
import {
  DatabaseFunction,
  DatabaseObject,
  DatabaseUserEntity,
} from "../../../interfaces/database-entity";
import { UserType } from "../../../../enums/user-type";

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
  }): Promise<DatabaseFunction<DatabaseObject<Required<UserType>>>> {
    return await db.updateRole({ id, role });
  };
}
