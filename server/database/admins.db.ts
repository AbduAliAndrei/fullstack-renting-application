import { firestore } from "firebase-admin/lib/firestore";
import { Admin } from "../../interfaces/admin";
import { CollectionPaths } from "../enums/collection-paths";
import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import Firestore = firestore.Firestore;
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export default function makeAdminsDb({
  db,
}: {
  db: Firestore;
}): DatabaseEntity<Admin> {
  return Object.freeze({
    add,
    findAll,
    findById,
    update,
    remove,
  });

  async function add(
    adminInfo: Required<Admin>
  ): Promise<DatabaseFunction<DatabaseObject<Required<Admin>>>> {
    const result = await db
      .collection(CollectionPaths.ADMIN)
      .doc()
      .set(adminInfo);
    return { data: { writeTime: result.writeTime.toDate(), data: adminInfo } };
  }
  async function findAll({
    name,
  }: {
    name?: string;
  }): Promise<DatabaseFunction<Required<Admin>[]> & { _name: string }> {
    const opts: [string, WhereFilterOp, string] = ["name", "==", name];
    const result = name
      ? await db
          .collection(CollectionPaths.ADMIN)
          .where(...opts)
          .get()
      : await db.collection(CollectionPaths.ADMIN).get();

    let admins: Required<Admin>[] = [];

    result.forEach((doc) => {
      admins = [
        ...admins,
        {
          email: doc.data().email,
          password: doc.data().password,
          userName: doc.data().userName,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          verified: doc.data().verified,
          id: doc.id,
          gender: doc.data().gender,
          bio: doc.data().bio,
          createdAt: doc.data().createdDate,
          updatedAt: doc.data().updatedDate,
          picture: doc.data().picture,
          admin: doc.data().admin,
        },
      ];
    });
    return { data: admins, _name: name };
  }
  async function findById({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<Required<Admin>> & { id?: string }> {
    const adminRef = await db.collection(CollectionPaths.ADMIN);
    const data = await adminRef.where("id", "==", id).get();
    if (data.empty) {
      return { data: null };
    }
    let admin!: Required<Admin>;
    let index = 0;

    data.forEach((data) => {
      if (index > 0) {
        return;
      }
      admin = {
        id: data.id,
        firstName: data.data().firstName,
        lastName: data.data().lastName,
        userName: data.data().userName,
        email: data.data().email,
        password: data.data().password,
        createdAt: data.data().createdDate,
        updatedAt: data.data().updatedDate,
        verified: data.data().verified,
        gender: data.data().gender,
        bio: data.data().bio,
        picture: data.data().picture,
        admin: data.data().admin,
      };
      index++;
    });

    return { data: admin, id };
  }
  async function update({
    id,
    data,
  }: {
    id: string;
    data: Required<Admin>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Admin>>>> {
    const admin = await db.collection(CollectionPaths.ADMIN).doc(id);
    const result = await admin.update(data);

    return { data: { writeTime: result.writeTime.toDate(), data } };
  }
  async function remove({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    const result = await db.collection(CollectionPaths.ADMIN).doc(id).delete();
    return { data: { writeTime: result.writeTime.toDate(), data: id } };
  }
}
