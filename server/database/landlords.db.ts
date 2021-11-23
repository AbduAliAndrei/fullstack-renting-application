import { firestore } from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import { Landlord } from "../../interfaces/landlord";
import { CollectionPaths } from "../enums/collection-paths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";

export default function makeLandlordsDb({
  db,
}: {
  db: Firestore;
}): DatabaseEntity<Landlord> {
  return Object.freeze({
    add,
    findAll,
    findById,
    update,
    remove,
  });

  async function add(
    landlordInfo: Required<Landlord>
  ): Promise<DatabaseFunction<DatabaseObject<Required<Landlord>>>> {
    const result = await db
      .collection(CollectionPaths.LANDLORD)
      .doc()
      .set(landlordInfo);
    return {
      data: { writeTime: result.writeTime.toDate(), data: landlordInfo },
    };
  }

  async function findAll({
    name,
  }: {
    name?: string;
  }): Promise<DatabaseFunction<Required<Landlord>[]> & { _name: string }> {
    const opts: [string, WhereFilterOp, string] = ["name", "==", name];
    const result = name
      ? await db
          .collection(CollectionPaths.LANDLORD)
          .where(...opts)
          .get()
      : await db.collection(CollectionPaths.LANDLORD).get();

    let landlords: Required<Landlord>[] = [];

    result.forEach((doc) => {
      landlords = [
        ...landlords,
        {
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          userName: doc.data().userName,
          email: doc.data().email,
          password: doc.data().password,
          createdAt: doc.data().createdDate,
          updatedAt: doc.data().updatedDate,
          verified: doc.data().verified,
          offersList: doc.data().offersList,
          trusted: doc.data().trusted,
          bio: doc.data().bio,
          picture: doc.data().picture,
          gender: doc.data().gender,
        },
      ];
    });

    return { data: landlords, _name: name };
  }

  async function findById({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<Required<Landlord>> & { id?: string }> {
    const landlordRef = await db.collection(CollectionPaths.LANDLORD);
    const data = await landlordRef.where("id", "==", id).get();
    if (data.empty) {
      return { data: null };
    }

    let landlord!: Required<Landlord>;
    let index = 0;

    data.forEach((data) => {
      if (index > 0) {
        return;
      }

      landlord = {
        id: data.id,
        firstName: data.data().firstName,
        lastName: data.data().lastName,
        userName: data.data().userName,
        email: data.data().email,
        password: data.data().password,
        createdAt: data.data().createdDate,
        updatedAt: data.data().updatedDate,
        verified: data.data().verified,
        offersList: data.data().offersList,
        trusted: data.data().trusted,
        gender: data.data().gender,
        bio: data.data().bio,
        picture: data.data().picture,
      };

      index++;
    });

    return { data: landlord, id };
  }

  async function update({
    id,
    data,
  }: {
    id: string;
    data: Required<Landlord>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Landlord>>>> {
    const landlord = await db.collection(CollectionPaths.LANDLORD).doc(id);
    const result = await landlord.update(data);

    return { data: { writeTime: result.writeTime.toDate(), data } };
  }

  async function remove({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    const result = await db
      .collection(CollectionPaths.LANDLORD)
      .doc(id)
      .delete();

    return { data: { writeTime: result.writeTime.toDate(), data: id } };
  }
}
