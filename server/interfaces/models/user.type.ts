import { Role } from "../../../interfaces/role";

export type UserModel = {
  getFirstName(): string;
  getLastName(): string;
  getCreatedAt(): Date;
  getId(): string;
  getUpdatedAt(): Date;
  getUsername(): string;
  getGender(): string;
  getPicture(): string;
  getEmail(): string;
  getBio(): string;
  isVerified(): boolean;
  getRole(): Role;
};
