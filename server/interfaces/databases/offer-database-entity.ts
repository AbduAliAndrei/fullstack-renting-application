import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../database-entity";
import { Offer, UpdatedOffer } from "../../../interfaces/offer";
import { FilterBy } from "./generic-database-entity";
import { AllowedFilterOfferKeys } from "../../../enums/allowed-offer-keys";

export interface DatabaseOfferEntity<T, TModel>
  extends Omit<DatabaseEntity<T, TModel>, "update"> {
  update: ({
    key,
    data,
  }: {
    key: string;
    data: Required<UpdatedOffer>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<T>>>>;
  findAll: ({
    ownerId,
  }: {
    ownerId?: string;
  }) => Promise<DatabaseFunction<Required<T>[]> & { _ownerId?: string }>;
  addPlanLayouts: (
    images: Express.Multer.File[],
    id: string
  ) => Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>>;
  addImages: (
    images: Express.Multer.File[],
    id: string
  ) => Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>>;
  findAllByKeys: ({
    filter,
  }: {
    filter: FilterBy<AllowedFilterOfferKeys>;
  }) => Promise<
    DatabaseFunction<Required<Offer>[]> & {
      filterBy?: FilterBy<AllowedFilterOfferKeys>;
    }
  >;
}
