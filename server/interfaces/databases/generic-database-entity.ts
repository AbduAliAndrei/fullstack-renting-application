import { DatabaseFunction, DatabaseObject } from "../database-entity";

export interface GenericDatabaseEntity<T, TModel> {
  add: (
    addInfo: Required<TModel>
  ) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;

  findAll: <F extends string>({
    findKey,
    key,
  }: {
    findKey?: string;
    key: F;
  }) => Promise<DatabaseFunction<Required<T>[]> & { [a in `_${F}`]?: string }>;

  find: <F extends string>({
    findKey,
    key,
  }: {
    findKey: string;
    key: F;
  }) => Promise<DatabaseFunction<Required<T>> & { [a in `_${F}`]?: string }>;

  update: <U, F>({
    field,
    key,
    data,
  }: {
    field: F;
    key: string;
    data: U;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;

  remove: <F>({
    key,
    field,
  }: {
    key: string;
    field: F;
  }) => Promise<DatabaseFunction<DatabaseObject<string>>>;

  refObject: <F extends string>({
    key,
    findKey,
  }: {
    key: string;
    findKey: F;
  }) => Promise<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
}
