import { BoundedBetweenNumber } from "../server/interfaces/databases/generic-database-entity";

export type FilterElement = {
  name: string;
  value: string | boolean | number | BoundedBetweenNumber;
  checked: boolean;
};

export type Filters = {
  filters: FilterElement[];
  name: string;
};
