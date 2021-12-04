import { DatabaseEntity } from "../../../interfaces/database-entity";
import { SecuredUser } from "../../../../interfaces/user";
import { UserModel } from "../../../interfaces/models/user.model";

interface TakeUserInterface {
  usersDb: DatabaseEntity<SecuredUser, UserModel>;
}

export default function takeUserCreator({ usersDb }: TakeUserInterface) {
  return async function takeUser(obj: {
    id: string;
  }): Promise<Required<SecuredUser>> {
    const user = await usersDb.findById({ id: obj.id });

    if (!user.fetchedData) {
      throw new Error(
        `Such user is not yet created on the database. Id: ${obj.id}`
      );
    }

    return user.fetchedData;
  };
}
