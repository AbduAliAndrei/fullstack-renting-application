import { Address } from "./address";
import { Cost } from "./cost";
import { RoomDetails } from "./room-details";

export interface Offer {
  ownerId: string;
  images: string[];
  generalInfo: GeneralInfo;
  additionalInfo: AdditionalInfo;
  validUntil: Date;
  validFrom: Date;
  expiresAt: Date;
  prevOffer: string | null; // offerId
  nextOffer: string | null;
  randomOffer: string;
}

type GeneralInfo = {
  title: string;
  cost: Cost;
  address: Address;
  area: number;
  numberOfRooms: number;
};

type AdditionalInfo = {
  rooms?: RoomDetails[];
  floor?: number;
  features?: Set<Feature>;
  environment: Environment;
  sections?: Section[];
  planLayout?: string[];
};

type Feature = {
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

type Environment = {
  universities?: Set<Proximity>;
  transport: Set<Proximity>;
  hotspots?: Set<Proximity>;
};

type Proximity = {
  name: string;
  distanceTo: number;
};

type Section = {
  title: string;
  content: string | Section;
};
