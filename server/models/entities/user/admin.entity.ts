import { Admin } from "../../../../interfaces/admin";
import { AdminModel } from "../../../interfaces/models/admin.type";

export default function buildMakeAdmin({
  Id,
  validate,
}: {
  Id: any;
  validate?: any;
}) {
  return function makeAdmin({
    firstName,
    lastName,
    createdAt = new Date(),
    id = Id.makeId(),
    email,
    userName = firstName + " " + lastName,
    updatedAt = new Date(),
    verified = true,
    password,
    picture,
    bio = "",
    gender,
    admin = true,
  }: Admin): Readonly<AdminModel> {
    if (!email) {
      throw new Error("Admin must have email");
    }

    if (!firstName || !lastName) {
      throw new Error("Admin must have first name and last name");
    }

    if (!password) {
      throw new Error("Admin password is required");
    }
    if (!picture) {
      throw new Error("Admin must provide a picture");
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
      isAdmin: () => admin,
      getGender: () => gender,
      getPicture: () => picture,
      getEmail: () => email,
      getBio: () => bio,
      isVerified: () => verified,
    });
  };
}
