import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { UserModel } from "../../../interfaces/models/user.type";
import { SecuredUser } from "../../../../interfaces/user";

export type UpdateUserServiceCreator = {
  usersDb: DatabaseEntity<SecuredUser, UserModel>;
};

export default function updateUserService({
  usersDb,
}: UpdateUserServiceCreator) {
  return async function updateUser(
    user: SecuredUser
  ): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    return await usersDb.update({
      id: user.id,
      data: user as Required<SecuredUser>,
    });
  };
}
