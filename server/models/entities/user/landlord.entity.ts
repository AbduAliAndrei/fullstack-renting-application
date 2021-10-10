import { Landlord } from "../../../../interfaces/landlord";
import { LandlordType } from "../../../interfaces/models/landlord.type";

export default function buildMakeLandlord({
  Id,
  validate,
}: {
  Id: any;
  validate?: any;
}) {
  return function makeLandlord({
    firstName,
    lastName,
    createdAt = new Date(),
    id = Id.makeId(),
    email,
    userName = firstName + " " + lastName,
    updatedAt = new Date(),
    verified = false,
    password,
    picture,
    bio = "",
    offersList = [],
    trusted,
    gender,
  }: Landlord): Readonly<LandlordType> {
    if (!email) {
      throw new Error("Landlord must have email");
    }

    if (!firstName || !lastName) {
      throw new Error("Landlord must have first name and last name");
    }

    if (!password) {
      throw new Error("Landlord password is required");
    }
    if (!picture) {
      throw new Error("Landlord must provide a picture");
    }

    return Object.freeze({
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getCreatedAt: () => createdAt,
      getId: () => id,
      getUpdatedAt: () => updatedAt,
      getUsername: () => userName,
      getPassword: () => password,
      getVerified: () => verified,
      getGender: () => gender,
      getPicture: () => picture,
      getEmail: () => email,
      getBio: () => bio,
      getOfferList: () => offersList,
      isTrusted: () => trusted,
      isVerified: () => verified,
    });
  };
}
