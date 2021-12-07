import { SecuredUser, User } from "../../../../interfaces/user";
import { UserType } from "../../../../enums/user-type";
import { UserModel } from "../../../interfaces/models/user.model";
import { Role } from "../../../../interfaces/role";
import { IdType } from "../../../../enums/id-type";

export default function buildMakeUser({
  Id,
  validate,
}: {
  Id: any;
  validate?: any;
}) {
  return function makeUser(
    {
      firstName,
      createdAt = new Date(),
      id = Id.makeId(),
      email,
      lastName,
      userName = firstName + " " + lastName,
      updatedAt = new Date(),
      verified = false,
      gender,
      bio = "",
      picture,
      password,
    }: Omit<User, "role">,
    userPick: UserType
  ): Readonly<UserModel> {
    if (!email) {
      throw new Error("Tenant must have email");
    }

    if (!firstName || !lastName) {
      throw new Error("Tenant must have first name and last name");
    }

    if (!password) {
      throw new Error("Tenant password is required");
    }
    if (!gender) {
      throw new Error("Tenant must provide gender");
    }

    if (!picture) {
      throw new Error("Tenant must provide a picture");
    }

    const role: Role = createRole(userPick);

    return Object.freeze({
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getCreatedAt: () => createdAt,
      getEmail: () => email,
      getId: () => id,
      getUpdatedAt: () => updatedAt,
      getUsername: () => userName,
      isVerified: () => verified,
      getBio: () => bio,
      getGender: () => gender,
      getPicture: () => picture,
      getPassword: () => password,
      getRole: () => role,
    });
  };
}

export function toUserFromModel(userModel: UserModel): Required<SecuredUser> {
  return {
    email: userModel.getEmail(),
    firstName: userModel.getFirstName(),
    lastName: userModel.getLastName(),
    userName: userModel.getUsername(),
    id: userModel.getId(),
    verified: userModel.isVerified(),
    gender: userModel.getGender(),
    picture: userModel.getPicture(),
    bio: userModel.getBio(),
    createdAt: userModel.getCreatedAt(),
    updatedAt: userModel.getUpdatedAt(),
    role: userModel.getRole(),
  };
}

export function createRole(userPick: UserType): Role {
  return userPick === UserType.TENANT
    ? {
        idType: IdType.UNKNOWN,
        role: userPick,
      }
    : userPick === UserType.LANDLORD
    ? {
        offerList: [],
        trusted: false,
        idType: IdType.UNKNOWN,
        role: userPick,
      }
    : {
        admin: true,
        role: userPick,
      };
}
