import { firestore } from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import {
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import { CollectionPaths } from "../enums/collection-paths";
import {
  FilterBy,
  GenericDatabaseEntity,
  OrderBy,
} from "../interfaces/databases/generic-database-entity";

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
    q:
      | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
      | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  ) => Required<T>;
}): GenericDatabaseEntity<T, TModel> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.freeze({ add, findAll, find, update, remove, refObject });

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

  async function findAllByKeys<
    FilterKeys extends string,
    OrderKeys extends string
  >({
    filterBy,
    orderBy,
    exclusiveEqual,
  }: {
    filterBy: FilterBy<FilterKeys>;
    orderBy: OrderBy<OrderKeys>;
    exclusiveEqual: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }): Promise<
    DatabaseFunction<Required<T>[]> &
      Array<{ [filter in `_${FilterKeys}`]?: FilterBy<FilterKeys> }> &
      Array<{ [order in `_${OrderKeys}`]?: OrderBy<OrderKeys> }>
  > {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Object.keys(filterBy).map((filterKey) => {});
  }

  async function findAll<F extends string>({
    findKey,
    key,
  }: {
    findKey?: string;
    key: F;
  }): Promise<DatabaseFunction<Required<T>[]> & { [a in `_${F}`]?: string }> {
    const opts: [string, WhereFilterOp, string] = [`${key}`, "==", findKey];
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

    return { fetchedData: data, ...{ [`_${key}`]: findKey } };
  }

  async function refObject<F extends string>({
    findKey,
    key,
  }: {
    findKey: string;
    key: F;
  }): Promise<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  > {
    const dataRef = await db.collection(collectionPath);
    const data = await dataRef.where(`${key}`, "==", findKey).get();
    if (data.empty || data.size === 0) {
      return null;
    }
    let res: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    data.forEach((i) => (res = i.ref));
    return res;
  }

  async function find<F extends string>({
    findKey,
    key,
  }: {
    findKey: string;
    key: F;
  }): Promise<DatabaseFunction<Required<T>> & { [a in `_${F}`]?: string }> {
    const dataRef = await db.collection(collectionPath);
    const data = await dataRef.where(`${key}`, "==", findKey).get();
    if (data.empty || data.size === 0) {
      return { fetchedData: null };
    }

    return {
      fetchedData: createT(data.docs[0]),
      ...{ [`_${key}`]: findKey },
    };
  }

  async function update<U, F>({
    field,
    key,
    data,
  }: {
    field: F;
    key: string;
    data: U;
  }): Promise<DatabaseFunction<DatabaseObject<Required<T>>>> {
    const dataRef = await db
      .collection(collectionPath)
      .where(`${field}`, "==", key)
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
        data: createT(await resData),
      },
    };
  }

  async function remove<F>({
    key,
    field,
  }: {
    key: string;
    field: F;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    const dataRef = await db
      .collection(collectionPath)
      .where(`${field}`, "==", key)
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
