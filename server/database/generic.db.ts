import { firestore } from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import {
  DatabaseFunction,
  DatabaseObject,
  GenericDatabaseEntity,
} from "../interfaces/database-entity";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import { CollectionPaths } from "../enums/collection-paths";

export default function makeGenericDb<T, TModel>({
  db,
  collectionPath,
  toTFromModelT,
  createT,
}: {
  db: Firestore;
  collectionPath: string;
  toTFromModelT: (t: TModel) => Required<T>;
  createT: (
    q: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  ) => Required<T>;
}): GenericDatabaseEntity<T, TModel> {
  return Object.freeze({ add, findAll, find, update, remove });

  async function add(
    addInfo: Required<TModel>
  ): Promise<DatabaseFunction<DatabaseObject<Required<T>>>> {
    const tObj = toTFromModelT(addInfo);
    const result = await db.collection(collectionPath).doc().set(tObj);
    return {
      fetchedData: {
        writeTime: result.writeTime.toDate(),
        data: tObj,
      },
    };
  }

  async function findAll<f extends string>({
    findKey,
  }: {
    findKey?: string;
  }): Promise<DatabaseFunction<Required<T>[]> & { [a in `_${f}`]?: string }> {
    const opts: [string, WhereFilterOp, string] = [`${findKey}`, "==", findKey];
    const result = findKey
      ? await db
          .collection(collectionPath)
          .where(...opts)
          .get()
      : await db.collection(CollectionPaths.OFFER).get();

    const data: Required<T>[] = [];

    result.forEach((doc) => {
      data.push(createT(doc));
    });

    return { fetchedData: data, ...{ [`_${findKey}`]: findKey } };
  }

  async function find<f extends string>({
    findKey,
  }: {
    findKey: string;
  }): Promise<DatabaseFunction<Required<T>> & { [a in `_${f}`]?: string }> {
    const dataRef = await db.collection(collectionPath);
    const data = await dataRef.where(`${findKey}`, "==", findKey).get();
    if (data.empty || data.size === 0) {
      return { fetchedData: null };
    }
    return {
      fetchedData: createT(data.docs[0]),
      ...{ [`_${findKey}`]: findKey },
    };
  }

  async function update<U>({
    key,
    data,
  }: {
    key: string;
    data: U;
  }): Promise<DatabaseFunction<DatabaseObject<Required<T>>>> {
    const dataRef = await db
      .collection(collectionPath)
      .where(`${key}`, "==", key)
      .get();

    let result: Promise<firestore.WriteResult>;
    let resData: Promise<firestore.DocumentSnapshot<firestore.DocumentData>>;
    dataRef.forEach((doc) => {
      result = doc.ref.update(data);
      resData = doc.ref.get();
    });

    return {
      fetchedData: {
        writeTime: (await result).writeTime.toDate(),
        data: createT((await resData)[0]),
      },
    };
  }

  async function remove({
    key,
  }: {
    key: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    const dataRef = await db
      .collection(collectionPath)
      .where(`${key}`, "==", key)
      .get();

    let result: Promise<firestore.WriteResult>;
    dataRef.forEach((doc) => {
      result = doc.ref.delete();
    });

    const fetched = await result;

    return {
      fetchedData: { writeTime: fetched.writeTime.toDate(), data: key },
    };
  }
}
