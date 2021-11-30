import { firestore } from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import { CollectionPaths } from "../enums/collection-paths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
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

export default function makeUsersDb({
  db,
}: {
  db: Firestore;
}): DatabaseUserEntity<SecuredUser, UserModel, Role> {
  return Object.freeze({
    add,
    findAll,
    findById,
    update,
    remove,
    updateRole,
  });

  async function add(
    userInfo: Required<UserModel>
  ): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    const result = await db
      .collection(CollectionPaths.USER)
      .doc()
      .set(toUserFromModel(userInfo));

    return {
      fetchedData: {
        writeTime: result.writeTime.toDate(),
        data: toUserFromModel(userInfo),
      },
    };
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
    DatabaseFunction<Required<SecuredUser>[]> & { _userName: string }
  > {
    const opts: [string, WhereFilterOp, string] = ["userName", "==", userName];
    const result = userName
      ? await db
          .collection(CollectionPaths.USER)
          .where(...opts)
          .get()
      : await db.collection(CollectionPaths.USER).get();

    const users: Required<SecuredUser>[] = [];

    result.forEach((doc) => {
      users.push(createUserFromDb(doc));
    });

    return { fetchedData: users, _userName: userName };
  }

  async function findById({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<Required<SecuredUser>> & { id?: string }> {
    const usersRef = await db.collection(CollectionPaths.USER);
    const data = await usersRef.where("id", "==", id).get();
    if (data.empty || data.size === 0) {
      return { fetchedData: null };
    }

    return { fetchedData: createUserFromDb(data.docs[0]), id };
  }

  async function update({
    id,
    data,
  }: {
    id: string;
    data: Required<SecuredUser>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<SecuredUser>>>> {
    const userRef = await db
      .collection(CollectionPaths.USER)
      .where("id", "==", id)
      .get();

    let result: Promise<firestore.WriteResult>;
    userRef.forEach((doc) => {
      result = doc.ref.update(data);
    });

    return {
      fetchedData: { writeTime: (await result).writeTime.toDate(), data },
    };
  }

  async function updateRole({
    id,
    role,
  }: {
    id: string;
    role: UserType;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Role>>>> {
    const userRef = await db
      .collection(CollectionPaths.USER)
      .where("id", "==", id)
      .get();

    const generatedRole = createRole(role);

    let result: Promise<firestore.WriteResult>;
    userRef.forEach((doc) => {
      result = doc.ref.update({
        role: generatedRole,
      });
    });

    return {
      fetchedData: {
        writeTime: (await result).writeTime.toDate(),
        data: generatedRole,
      },
    };
  }

  async function remove({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    const usersRef = await db
      .collection(CollectionPaths.USER)
      .where("id", "==", id)
      .get();

    let result: Promise<firestore.WriteResult>;
    usersRef.forEach((doc) => {
      result = doc.ref.delete();
    });

    const fetched = await result;

    return { fetchedData: { writeTime: fetched.writeTime.toDate(), data: id } };
  }
}
