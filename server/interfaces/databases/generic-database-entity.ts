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
    exclusiveEqual?: boolean;
  }) => Promise<
    DatabaseFunction<Required<T>[]> & { filterBy?: FilterBy<FilterKeys> } & {
      orderBy?: OrderBy<OrderKeys>;
    }
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
    alterCollectionPath,
  }: {
    key: string;
    findKey: F;
    alterCollectionPath?: string;
  }) => Promise<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
}

export type FilterBy<Key extends string> = Record<Key, MultiselectSortBy>;

export type MultiselectSortBy = Array<
  string | boolean | number | BoundedBetweenNumber
>;

export type BoundedBetween<T> = { lowerBound: T; upperBound: T };

export type BoundedBetweenNumber = BoundedBetween<number>;

export type OrderBy<Key extends string> = Record<Key, OrderDirection>;

export enum OrderDirection {
  ACCENDING,
  DESCENDING,
}

export function isBoundedBetween(
  variable: any
): variable is BoundedBetweenNumber {
  return !!variable.lowerBound && !!variable.upperBound;
}

export function isBoundedBetweenArray(
  variable: any[]
): variable is BoundedBetweenNumber[] {
  return variable.some(isBoundedBetween);
}

export type ComparisonOperator = "==" | "<=" | ">=" | "<" | ">";
export type FilterOptionTuple = [string, ComparisonOperator, any];
