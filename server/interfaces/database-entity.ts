export interface DatabaseEntity<T> {
  add: (
    info: Required<T>
  ) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  findAll: ({
    name,
  }: {
    name?: string;
  }) => Promise<DatabaseFunction<Required<T>[]> & { _name: string }>;
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
  data: T;
};

export interface DatabaseObject<T> {
  writeTime: Date;
  data: T;
}
