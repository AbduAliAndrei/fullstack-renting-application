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
  BoundedBetweenKeyField,
  BoundedBetweenNumber,
  FilterBy,
  FilterOptionTuple,
  GenericDatabaseEntity,
  isBoundedBetweenArray,
  OrderBy,
} from "../interfaces/databases/generic-database-entity";
import MultiMap from "mnemonist/multi-map";
import { intersectArray } from "../../utils/intersect";

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
    orderBy?: OrderBy<OrderKeys>;
    exclusiveEqual?: boolean;
    orderDirection?: boolean;
  }): Promise<
    DatabaseFunction<Required<T>[]> & { filterBy?: FilterBy<FilterKeys> } & {
      orderBy?: OrderBy<OrderKeys>;
    }
  > {
    const filterRules: (FilterOptionTuple[] | BoundedBetweenKeyField)[] =
      Object.keys(filterBy).map((filterKey) => {
        if (isBoundedBetweenArray(filterBy[filterKey])) {
          const lowerBounds = (
            filterBy[filterKey] as BoundedBetweenNumber[]
          ).map((i) => i.lowerBound);
          const upperBounds = (
            filterBy[filterKey] as BoundedBetweenNumber[]
          ).map((i) => i.upperBound);
          const min = Math.min(...lowerBounds);
          const max = Math.max(...upperBounds);
          return {
            lowerBound: min,
            upperBound: max,
            fieldKey: filterKey,
          };
        } else {
          return filterBy[filterKey].map((i) => [
            `${filterKey}`,
            filterKey.includes(".") ? "in" : "==",
            filterKey.includes(".") ? [i] : i,
          ]);
        }
      });

    const filterOnlyEqualRules = filterRules.filter((rule) =>
      Array.isArray(rule)
    ) as FilterOptionTuple[][];

    const biggerLessRules = filterRules.filter(
      (rule) => typeof (rule as BoundedBetweenKeyField).upperBound === "number"
    ) as BoundedBetweenKeyField[];
    const collection = db.collection(collectionPath);

    let sortedCollection: firestore.Query<firestore.DocumentData> = collection;
    if (orderBy) {
      Object.keys(orderBy).map((orderByKey) => {
        sortedCollection = collection.orderBy(orderByKey, orderBy[orderByKey]);
      });
    }
    const multiMap = new MultiMap<string, Required<T>>();

    await Promise.all(
      filterOnlyEqualRules.map(
        async (oneD) =>
          await Promise.all(
            oneD.map(async (twoD) => {
              const query = await sortedCollection.where(...twoD).get();
              query.forEach((queryElement) => {
                multiMap.set(twoD[0], createT(queryElement));
              });
            })
          )
      )
    );

    await Promise.all(
      biggerLessRules.map(async (oneD) => {
        const query = await (exclusiveEqual
          ? sortedCollection
              .orderBy(oneD.fieldKey)
              .startAt(oneD.lowerBound)
              .endAt(oneD.upperBound)
          : sortedCollection
              .orderBy(oneD.fieldKey)
              .startAfter(oneD.lowerBound)
              .endBefore(oneD.upperBound)
        ).get();
        query.forEach((queryElement) => {
          multiMap.set(oneD.fieldKey, createT(queryElement));
        });
      })
    );

    let intersection: Required<T[]> = [];
    let index = 0;
    const iterator = multiMap.associations();
    let it = iterator.next();
    while (!it.done) {
      if (index === 0) {
        intersection = it.value[1];
      } else {
        intersection = [...intersectArray<T>(intersection, it.value[1])];
      }
      it = iterator.next();
      index++;
    }

    return {
      fetchedData: intersection as Required<T>[],
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
