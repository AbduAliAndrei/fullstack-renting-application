import { DatabaseFunction, DatabaseObject } from "../database-entity";

export interface GenericDatabaseEntity<T, TModel> {
  add: (
    addInfo: Required<TModel>
  ) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;

  findAllByKeys: <FilterKeys extends string, OrderKeys extends string>({
    filterBy,
    orderBy,
  }: {
    filterBy: FilterBy<FilterKeys>;
    orderBy: OrderBy<OrderKeys>;
    exclusiveEqual: boolean;
  }) => Promise<
    DatabaseFunction<Required<T>[]> &
      Array<{ [filter in `_${FilterKeys}`]?: FilterBy<FilterKeys> }> &
      Array<{ [order in `_${OrderKeys}`]?: OrderBy<OrderKeys> }>
  >;

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

export type FilterBy<Key extends string> = Record<Key, MultiselectSortBy>;

export type MultiselectSortBy = Array<
  string | boolean | number | BoundedBetween
>;

export type BoundedBetween = { lowerBound: number; upperBound: number };

export type OrderBy<Key extends string> = Record<Key, OrderDirection>;

export enum OrderDirection {
  ACCENDING,
  DESCENDING,
}
