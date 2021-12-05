import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../database-entity";
import { Offer } from "../../../interfaces/offer";

export interface DatabaseOfferEntity<T, TModel>
  extends Omit<DatabaseEntity<T, TModel>, "update"> {
  update: ({
    key,
    data,
  }: {
    key: string;
    data: Required<Offer>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  findAll: ({
    ownerId,
  }: {
    ownerId?: string;
  }) => Promise<DatabaseFunction<Required<T>[]> & { _ownerId?: string }>;
}
