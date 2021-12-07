import { DatabaseFunction } from "../../../interfaces/database-entity";
import { SecuredUser } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.model";
import { DatabaseUserEntity } from "../../../interfaces/databases/user-database-entity";

interface TakeUsersInterface {
  usersDb: DatabaseUserEntity<SecuredUser, UserModel>;
}

export default function takeUsersCreator({ usersDb }: TakeUsersInterface) {
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
