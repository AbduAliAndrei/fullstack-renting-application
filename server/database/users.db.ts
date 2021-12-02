import { firestore } from "firebase-admin/lib/firestore";
import { CollectionPaths } from "../enums/collection-paths";
import {
  DatabaseFunction,
  DatabaseObject,
  DatabaseUserEntity,
} from "../interfaces/database-entity";
import { SecuredUser } from "../../interfaces/user";
import { UserModel } from "../interfaces/models/user.type";
import {
  createRole,
  toUserFromModel,
} from "../models/entities/user/user.entity";
import { UserType } from "../../enums/user-type";
import { Role } from "../../interfaces/role";
import makeGenericDb from "./generic.db";
import Firestore = firestore.Firestore;

export default function makeUsersDb({
  db,
}: {
  db: Firestore;
}): DatabaseUserEntity<SecuredUser, UserModel> {
  const genericUserDb = makeGenericDb<SecuredUser, UserModel>({
    db,
    collectionPath: CollectionPaths.USER,
    createT: createUserFromDb,
    toTFromModelT: toUserFromModel,
  });

  return Object.freeze({
    add,
    findAll,
    findById,
    update,
    remove,
    updateRole,
  });

  async function add(
    addInfo: Required<UserModel>
  ): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    return genericUserDb.add(addInfo);
  }

  function createUserFromDb(doc): Required<SecuredUser> {
    return {
      id: doc.data().id,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      userName: doc.data().userName,
      email: doc.data().email,
      createdAt: doc.data().createdAt,
      updatedAt: doc.data().updatedAt,
      verified: doc.data().verified,
      role: doc.data().role,
      gender: doc.data().gender,
      bio: doc.data().bio,
      picture: doc.data().picture,
    };
  }

  async function findAll({
    userName,
  }: {
    userName?: string;
  }): Promise<
    DatabaseFunction<Required<SecuredUser>[]> & { _userName?: string }
  > {
    return genericUserDb.findAll<"userName">({
      findKey: userName,
      key: "userName",
    });
  }

  async function findById({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<Required<SecuredUser>> & { _id?: string }> {
    const res = genericUserDb.find<"id">({ findKey: id, key: "id" });
    console.log(res);
    return res;
  }

  async function update({
    key,
    data,
  }: {
    key: string;
    data: Required<SecuredUser>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    return genericUserDb.update<Required<SecuredUser>, "id">({
      key,
      data,
      field: "id",
    });
  }

  async function updateRole({
    id,
    role,
  }: {
    id: string;
    role: UserType;
  }): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    const generatedRole = createRole(role);
    return genericUserDb.update<{ role: Role }, "id">({
      key: id,
      data: { role: generatedRole },
      field: "id",
    });
  }

  async function remove({
    key,
  }: {
    key: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    return genericUserDb.remove({ key });
  }
}
