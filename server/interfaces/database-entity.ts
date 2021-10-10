export type DatabaseAdd<T> = (
  info: Required<T>
) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
export type DatabaseFindAll<T> = ({
  name,
}: {
  name?: string;
}) => Promise<DatabaseFunction<Required<T>[]> & { _name: string }>;

export type DatabaseFindById<T> = ({
  id,
}: {
  id: string;
}) => Promise<DatabaseFunction<Required<T>> & { id?: string }>;

export type DatabaseUpdate<T> = ({
  id,
  data,
}: {
  id: string;
  data: Required<T>;
}) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;

export type DatabaseRemove = ({
  id,
}: {
  id: string;
}) => Promise<DatabaseFunction<DatabaseObject<string>>>;

export interface DatabaseEntity<T> {
  add: DatabaseAdd<T>;
  findAll: DatabaseFindAll<T>;
  findById: DatabaseFindById<T>;
  update: DatabaseUpdate<T>;
  remove: DatabaseRemove;
}

export type DatabaseFunction<T> = {
  data: T;
};

export interface DatabaseObject<T> {
  writeTime: Date;
  data: T;
}
