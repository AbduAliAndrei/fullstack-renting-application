import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { User } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.type";

export default function createUserCreator({
  db,
}: {
  db: DatabaseEntity<User, UserModel>;
}) {
  return async function createUser(
    info: UserModel
  ): Promise<DatabaseFunction<DatabaseObject<Required<User>>>> {
    return db.add(info);
  };
}
