import { GenericDatabaseEntity } from "./databases/generic-database-entity";

export interface DatabaseEntity<T, TModel>
  extends Pick<GenericDatabaseEntity<T, TModel>, "add"> {
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
  remove: ({
    key,
  }: {
    key: string;
  }) => Promise<DatabaseFunction<DatabaseObject<string>>>;
}

export type DatabaseFunction<T> = {
  fetchedData: T;
};

export interface DatabaseObject<T> {
  writeTime: Date;
  data: T;
}
