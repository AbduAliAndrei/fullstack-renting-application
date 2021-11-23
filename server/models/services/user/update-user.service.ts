import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { UserModel } from "../../../interfaces/models/user.type";
import { User } from "../../../../interfaces/user";

export type UpdateUserServiceCreator = {
  usersDb: DatabaseEntity<User, UserModel>;
};

export default function updateUserService({
  usersDb,
}: UpdateUserServiceCreator) {
  return async function updateUser(
    user: User
  ): Promise<DatabaseFunction<DatabaseObject<Required<User>>>> {
    return await usersDb.update({
      id: user.id,
      data: user as Required<User>,
    });
  };
}
