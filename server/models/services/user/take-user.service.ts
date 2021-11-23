import { DatabaseEntity } from "../../../interfaces/database-entity";
import { User } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.type";

interface TakeUserInterface {
  usersDb: DatabaseEntity<User, UserModel>;
}

export default function takeUserCreator({ usersDb }: TakeUserInterface) {
  return async function takeUser(obj: { id: string }): Promise<Required<User>> {
    const user = await usersDb.findById({ id: obj.id });

    if (!user.fetchedData) {
      throw new Error(
        `Such user is not yet created on the database. Id: ${obj.id}`
      );
    }

    return user.fetchedData;
  };
}
