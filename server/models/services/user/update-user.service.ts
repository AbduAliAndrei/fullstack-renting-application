import {
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { UserModel } from "../../../interfaces/models/user.model";
import { SecuredUser, UpdatedUser } from "../../../../interfaces/user";
import { DatabaseUserEntity } from "../../../interfaces/databases/user-database-entity";

export type UpdateUserServiceCreator = {
  usersDb: DatabaseUserEntity<SecuredUser, UserModel>;
};

export default function updateUserService({
  usersDb,
}: UpdateUserServiceCreator) {
  return async function updateUser(
    user: UpdatedUser,
    userId: string
  ): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    return await usersDb.update({
      key: userId,
      data: user as Required<UpdatedUser>,
    });
  };
}
