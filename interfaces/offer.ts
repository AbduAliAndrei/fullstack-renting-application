import { Address } from "./address";
import { Cost } from "./cost";
import { RoomDetails } from "./room-details";

export interface Offer {
  id: string;
  ownerId: string;
  images: string[];
  generalInfo: GeneralInfo;
  additionalInfo: AdditionalInfo;
  validUntil: Date;
  validFrom: Date;
  expiresAt: Date;
  randomOffer: string | null;
}
export type UpdatedOffer = Omit<
  Offer,
  "expiresAt" | "ownerId" | "id" | "randomOffer"
>;

export type GeneralInfo = {
  title: string;
  cost: Cost;
  address: Address;
  area: number;
  numberOfRooms: number;
};

export type AdditionalInfo = {
  rooms?: RoomDetails[];
  floor?: number;
  features?: Set<Feature>;
  environment: Environment;
  sections?: Section[];
  planLayout?: string[];
};

export type Feature = {
  kitchen: boolean;
  wifi: boolean;
  heating: boolean;
  smoking: boolean;
  furnished: boolean;
  elevator: boolean;
  fridge: boolean;
  microwave: boolean;
  houseCleaning?: boolean;
  parking?: boolean;
  washingMachine?: boolean;
  pool?: boolean;
  petFriendly?: boolean;
  hasTv?: boolean;
  separateToilet?: boolean;
  balcony?: boolean;
  quietNeighborhood?: boolean;
  security247?: boolean;
  gym?: boolean;
  garden?: boolean;
};

export type Environment = {
  universities?: Set<Proximity>;
  transport: Set<Proximity>;
  hotspots?: Set<Proximity>;
};

export type Proximity = {
  name: string;
  distanceTo: number;
};

export type Section = {
  title: string;
  content: string | Section;
};

export type OfferBlobs = Omit<
  Offer,
  "images" | "additionalInfo" | "ownerId"
> & {
  images: Blob[];
  additionalInfo: Omit<AdditionalInfo, "planLayout"> & { planLayout?: Blob[] };
};
