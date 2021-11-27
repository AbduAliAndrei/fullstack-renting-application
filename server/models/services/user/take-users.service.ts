import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { SecuredUser } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.type";

interface TakeUserInterface {
  usersDb: DatabaseEntity<SecuredUser, UserModel>;
}

export default function takeUsersCreator({ usersDb }: TakeUserInterface) {
  return async function takeUsers(): Promise<
    DatabaseFunction<Required<SecuredUser[]>>
  > {
    const users = await usersDb.findAll({});

    if (!users.fetchedData) {
      throw new Error(`Users not found`);
    }

    return users;
  };
}
