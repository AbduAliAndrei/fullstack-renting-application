import { firestore } from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import { CollectionPaths } from "../enums/collection-paths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import { SecuredUser } from "../../interfaces/user";
import { UserModel } from "../interfaces/models/user.type";
import { toUserFromModel } from "../models/entities/user/user.entity";

export default function makeUsersDb({
  db,
}: {
  db: Firestore;
}): DatabaseEntity<SecuredUser, UserModel> {
  return Object.freeze({
    add,
    findAll,
    findById,
    update,
    remove,
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
    const tenant = await db.collection(CollectionPaths.USER).doc(id);
    const result = await tenant.update(data);

    return { fetchedData: { writeTime: result.writeTime.toDate(), data } };
  }

  async function remove({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    const result = await db.collection(CollectionPaths.USER).doc(id).delete();

    return { fetchedData: { writeTime: result.writeTime.toDate(), data: id } };
  }
}
