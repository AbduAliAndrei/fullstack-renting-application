export interface DatabaseEntity<T, TModel> {
  add: (
    info: Required<TModel>
  ) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  findAll: ({
    userName,
  }: {
    userName?: string;
  }) => Promise<DatabaseFunction<Required<T>[]> & { _userName: string }>;
  findById: ({
    id,
  }: {
    id: string;
  }) => Promise<DatabaseFunction<Required<T>> & { id?: string }>;
  update: ({
    id,
    data,
  }: {
    id: string;
    data: Required<T>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  remove: ({
    id,
  }: {
    id: string;
  }) => Promise<DatabaseFunction<DatabaseObject<string>>>;
}

export type DatabaseFunction<T> = {
  fetchedData: T;
};

export interface DatabaseObject<T> {
  writeTime: Date;
  data: T;
}
