export enum AllowedFilterOfferKeys {
  TITLE = "generalInfo.title",
  PRICE = "generalInfo.cost.totalCost",
  CITY = "generalInfo.address.city",
  DISTRICT = "generalInfo.address.district",
}

export type AllowedFilterOfferKeysType =
  | AllowedFilterOfferKeys.TITLE
  | AllowedFilterOfferKeys.CITY
  | AllowedFilterOfferKeys.DISTRICT
  | AllowedFilterOfferKeys.PRICE;
