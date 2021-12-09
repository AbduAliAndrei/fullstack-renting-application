import { Currency } from "../enums/currency";

export type Cost = {
  totalCost: number;
  coldRent: number;
  utilities: number;
  extras: number;
  currency: Currency;
};
