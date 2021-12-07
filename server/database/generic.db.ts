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
  BoundedBetween,
  BoundedBetweenNumber,
  FilterBy,
  FilterOptionTuple,
  GenericDatabaseEntity,
  isBoundedBetweenArray,
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
  return Object.freeze({
    add,
    findAll,
    find,
    update,
    remove,
    refObject,
    findAllByKeys,
  });

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
    exclusiveEqual = true,
  }: {
    filterBy: FilterBy<FilterKeys>;
    orderBy: OrderBy<OrderKeys>;
    exclusiveEqual?: boolean;
    orderDirection?: boolean;
  }): Promise<
    DatabaseFunction<Required<T>[]> & { filterBy?: FilterBy<FilterKeys> } & {
      orderBy?: OrderBy<OrderKeys>;
    }
  > {
    const filterRules: (
      | FilterOptionTuple[]
      | BoundedBetween<FilterOptionTuple>
    )[] = Object.keys(filterBy).map((filterKey) => {
      if (isBoundedBetweenArray(filterBy[filterKey])) {
        const lowerBounds = (filterBy[filterKey] as BoundedBetweenNumber[]).map(
          (i) => i.lowerBound
        );
        const upperBounds = (filterBy[filterKey] as BoundedBetweenNumber[]).map(
          (i) => i.upperBound
        );
        const min = Math.min(...lowerBounds);
        const max = Math.max(...upperBounds);
        return {
          lowerBound: [`${filterKey}`, exclusiveEqual ? "<=" : "<", min],
          upperBound: [`${filterKey}`, exclusiveEqual ? ">=" : ">", max],
        };
      } else {
        return filterBy[filterKey].map((i) => [`${filterKey}`, "==", i]);
      }
    });

    const filterOnlyEqualRules = filterRules.filter((rule) =>
      Array.isArray(rule)
    ) as FilterOptionTuple[][];

    const biggerLessRules = filterRules.filter(
      (rule) => !!(rule as BoundedBetween<FilterOptionTuple>).lowerBound
    ) as BoundedBetween<FilterOptionTuple>[];
    const collection = db.collection(collectionPath);

    let sortedCollection: firestore.Query<firestore.DocumentData>;
    Object.keys(orderBy).map((orderByKey) => {
      sortedCollection = collection.orderBy(orderByKey, orderBy[orderByKey]);
    });

    let queryOne: firestore.Query;
    filterOnlyEqualRules.map((oneD) =>
      oneD.map((twoD) => {
        queryOne = sortedCollection.where(...twoD);
      })
    );

    let queryTwo: firestore.Query;
    biggerLessRules.map((oneD) => {
      queryTwo = sortedCollection.where(...oneD.lowerBound);
      queryTwo = sortedCollection.where(...oneD.upperBound);
    });

    const q1Get = await queryOne.get();
    const q2Get = await queryTwo.get();
    const hashMap = new Map<string, Required<T>>();
    q1Get.forEach((q1) => {
      hashMap.set(q1.id, createT(q1));
    });
    q2Get.forEach((q2) => {
      if (!hashMap.has(q2.id)) {
        hashMap.set(q2.id, createT(q2));
      }
    });

    return {
      fetchedData: Array.from(hashMap.values()) as Required<T>[],
      filterBy,
      orderBy,
    };
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
    alterCollectionPath,
  }: {
    findKey: string;
    key: F;
    alterCollectionPath?: string;
  }): Promise<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  > {
    const dataRef = await db.collection(alterCollectionPath ?? collectionPath);
    const data = await dataRef.where(`${findKey}`, "==", key).get();
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
