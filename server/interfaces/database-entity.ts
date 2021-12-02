import { UserType } from "../../enums/user-type";
import { SecuredUser } from "../../interfaces/user";

export interface GenericDatabaseEntity<T, TModel> {
  add: (
    addInfo: Required<TModel>
  ) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  findAll: <f extends string>({
    findKey,
  }: {
    findKey?: string;
  }) => Promise<DatabaseFunction<Required<T>[]> & { [a in `_${f}`]?: string }>;
  find: <f extends string>({
    findKey,
  }: {
    findKey: string;
  }) => Promise<DatabaseFunction<Required<T>> & { [a in `_${f}`]?: string }>;
  update: <U>({
    key,
    data,
  }: {
    key: string;
    data: U;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  remove: ({
    key,
  }: {
    key: string;
  }) => Promise<DatabaseFunction<DatabaseObject<string>>>;
}

export interface DatabaseEntity<T, TModel>
  extends Pick<GenericDatabaseEntity<T, TModel>, "remove" | "add"> {
  findAll: ({
    userName,
  }: {
    userName?: string;
  }) => Promise<DatabaseFunction<Required<T>[]> & { _userName?: string }>;
  findById: ({
    id,
  }: {
    id: string;
  }) => Promise<DatabaseFunction<Required<T>> & { _id?: string }>;
  update: ({
    key,
    data,
  }: {
    key: string;
    data: Required<T>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
}

export interface DatabaseUserEntity<T, Model> extends DatabaseEntity<T, Model> {
  updateRole: ({
    id,
    role,
  }: {
    id: string;
    role: UserType;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>>;
}

export type DatabaseFunction<T> = {
  fetchedData: T;
};

export interface DatabaseObject<T> {
  writeTime: Date;
  data: T;
}
