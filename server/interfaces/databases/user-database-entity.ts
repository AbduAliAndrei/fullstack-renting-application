import { SecuredUser, UpdatedUser } from "../../../interfaces/user";
import { UserType } from "../../../enums/user-type";
import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../database-entity";

export interface DatabaseUserEntity<T, Model>
  extends Omit<DatabaseEntity<T, Model>, "update"> {
  update: ({
    key,
    data,
  }: {
    key: string;
    data: Required<UpdatedUser>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  updateRole: ({
    id,
    role,
  }: {
    id: string;
    role: UserType;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>>;
}
