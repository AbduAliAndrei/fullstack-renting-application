import { Offer } from "../../interfaces/offer";
import { firestore } from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import { OfferModel } from "../interfaces/models/offer.model";
import { CollectionPaths } from "../enums/collection-paths";
import { toOfferFromModel } from "../models/entities/offer/offer.entity";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import makeGenericDb from "./generic.db";

// TODO: finish make offers db
export default function makeOffersDb({
  db,
}: {
  db: Firestore;
  st: Storage;
}): Readonly<{
  getNextOffer: () => null;
  findById: ({
    id,
  }: {
    id: string;
  }) => Promise<DatabaseFunction<Required<Offer>> & { _id?: string }>;
  update: ({
    key,
    data,
  }: {
    key: string;
    data: Required<Offer>;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>>;
  getPreviousOffer: () => null;
  findAll: ({
    id,
  }: {
    id?: string;
  }) => Promise<DatabaseFunction<Required<Offer>[]> & { _id?: string }>;
  remove: ({
    key,
  }: {
    key: string;
  }) => Promise<DatabaseFunction<DatabaseObject<string>>>;
  getRandomOffer: () => null;
}> {
  const genericOfferDb = makeGenericDb<Offer, OfferModel>({
    db,
    collectionPath: CollectionPaths.OFFER,
    createT: createOfferFromDb,
    toTFromModelT: toOfferFromModel,
  });
  return Object.freeze({
    findAll,
    findById,
    update,
    remove,
    getNextOffer: () => null,
    getPreviousOffer: () => null,
    getRandomOffer: () => null,
  });

  function createOfferFromDb(
    doc:
      | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
      | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  ): Required<Offer> {
    return {
      id: doc.data().id,
      ownerId: doc.data().ownerId,
      generalInfo: doc.data().generalInfo,
      additionalInfo: doc.data().additionalInfo,
      validUntil: doc.data().validUntil,
      validFrom: doc.data().validFrom,
      expiresAt: doc.data().expiresAt,
      prevOffer: doc.data().prevOffer,
      nextOffer: doc.data().nextOffer,
      images: doc.data().images,
      randomOffer: doc.data().randomOffer,
    };
  }

  async function findAll({
    id,
  }: {
    id?: string;
  }): Promise<DatabaseFunction<Required<Offer>[]> & { _id?: string }> {
    return genericOfferDb.findAll<"id">({
      findKey: id,
      key: "id",
    });
  }

  async function findById({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<Required<Offer>> & { _id?: string }> {
    const res = genericOfferDb.find<"id">({ findKey: id, key: "id" });
    console.log(res);
    return res;
  }

  async function update({
    key,
    data,
  }: {
    key: string;
    data: Required<Offer>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    return genericOfferDb.update<Required<Offer>, "id">({
      key,
      data,
      field: "id",
    });
  }
  async function remove({
    key,
  }: {
    key: string;
  }): Promise<DatabaseFunction<DatabaseObject<string>>> {
    return genericOfferDb.remove<"id">({ key, field: "id" });
  }
}
