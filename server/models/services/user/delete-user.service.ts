import { UserType } from "../../../../enums/user-type";
import {
  DatabaseEntity,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import asyncF from "../../../../utils/async-f";
import { User } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.type";

export type DeleteUserService = {
  usersDb: DatabaseEntity<User, UserModel>;
};

export default function deleteUserService({ usersDb }: DeleteUserService) {
  return async function deleteUser(
    id: string,
    type: UserType,
    authRemove: ({ uid }: { uid: string }) => Promise<void>
  ): Promise<DatabaseObject<string>> {
    const removeRes = await usersDb.remove({ id });
    console.log(removeRes);
    if (!removeRes.fetchedData) {
      throw new Error("User was not deleted. Uncaught error.");
    }

    const [, error] = await asyncF(authRemove({ uid: id }));
    if (error) {
      throw new Error(`Database error occurred. Please consider: ${error}`);
    }
    return removeRes.fetchedData;
  };
}
