import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { User } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.type";
import { UserType } from "../../../../enums/user-type";

export default function createUserCreator({
  db,
  makeUser,
}: {
  db: DatabaseEntity<User, UserModel>;
  makeUser: (user: User, userPick: UserType) => UserModel;
}) {
  return async function createUser(
    info: User,
    userType: UserType
  ): Promise<DatabaseFunction<DatabaseObject<Required<User>>>> {
    return db.add(makeUser(info, userType));
  };
}
