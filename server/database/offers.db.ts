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
import { DatabaseOfferEntity } from "../interfaces/databases/offer-database-entity";

export default function makeOffersDb({
  db,
}: {
  db: Firestore;
  st: Storage;
}): DatabaseOfferEntity<Offer, OfferModel> {
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
    add,
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
      images: doc.data().images,
      randomOffer: doc.data().randomOffer,
    };
  }

  async function getRandomOffer({
    ownerId,
  }: {
    ownerId: string;
  }): Promise<DatabaseFunction<Required<Offer>> & { _id?: string }> {
    const offersList = await genericOfferDb.findAll<"ownerId">({
      findKey: ownerId,
      key: "ownerId",
    });
    const res: Offer =
      offersList.fetchedData[
        Math.floor(Math.random() * offersList.fetchedData.length)
      ];
    return { fetchedData: res, _id: ownerId };
  }

  async function getOwnerRefById(
    id: string
  ): Promise<firestore.DocumentReference<firestore.DocumentData>> {
    return await genericOfferDb.refObject<"id">({ key: id, findKey: "id" });
  }

  async function add(
    offerInfo: Required<OfferModel>
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    const ownerRef = await getOwnerRefById(offerInfo.getOwnerId());
    return genericOfferDb.add({ ...offerInfo, getOwner: () => ownerRef });
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
