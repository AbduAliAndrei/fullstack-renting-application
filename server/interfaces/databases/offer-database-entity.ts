import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../database-entity";
import { UpdatedUser } from "../../../interfaces/user";

export interface DatabaseOfferEntity<T, TModel>
  extends Omit<DatabaseEntity<T, TModel>, "update"> {
  update: ({
    key,
    data,
  }: {
    key: string;
    data: Required<UpdatedUser>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  getNextOffer: ({
    key,
  }: {
    key: string;
  }) => Promise<DatabaseObject<Required<T>>>;
  getPreviousOffer: ({
    key,
  }: {
    key: string;
  }) => Promise<DatabaseObject<Required<T>>>;
  getRandomOffer: ({
    key,
  }: {
    key: string;
  }) => Promise<DatabaseObject<Required<T>>>;
}
