import Firestore = firestore.Firestore;
import { AdditionalInfo, Offer, UpdatedOffer } from "../../interfaces/offer";
import { firestore } from "firebase-admin/lib/firestore";
import { OfferModel } from "../interfaces/models/offer.model";
import { CollectionPaths } from "../enums/collection-paths";
import { toOfferFromModel } from "../models/entities/offer/offer.entity";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../interfaces/database-entity";
import makeGenericDb from "./generic.db";
import { DatabaseOfferEntity } from "../interfaces/databases/offer-database-entity";
import { Role } from "../../interfaces/role";
import firebase from "firebase";
import { createImagesOnPath } from "./utils";
import FileDeleteException from "../exceptions/file-delete.exception";
import { ImagePaths } from "../enums/image-paths";
import FalsyValueException from "../exceptions/falsy-value-exception";
import { UserType } from "../../enums/user-type";
import WrongUserTypeException from "../exceptions/wrong-user-type.exception";
import { isBlobOrStringArray } from "../../utils/type-checkers";

export default function makeOffersDb({
  db,
  st,
}: {
  db: Firestore;
  st: firebase.storage.Storage;
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
    addImages,
    addPlanLayouts,
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
    return await genericOfferDb.refObject<"id">({
      key: id,
      findKey: "id",
      alterCollectionPath: CollectionPaths.USER,
    });
  }

  async function add(
    offerInfo: Required<OfferModel>
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    if (!isBlobOrStringArray(offerInfo.getImages())) {
      throw new FalsyValueException("Expected array of strings or blobs");
    }
    // update owner (user)
    const ownerRef = await getOwnerRefById(offerInfo.getOwnerId());
    const role: Role = (await ownerRef.get()).data().role;
    if (role.role !== UserType.LANDLORD) {
      throw new WrongUserTypeException(role.role, UserType.LANDLORD);
    }
    await ownerRef.update({
      role: { ...role, offerList: [...role.offerList, offerInfo.getId()] },
    });
    // put images to storage -> done in separate functions

    const offerModel: Required<OfferModel> = {
      ...offerInfo,
      getOwner: () => ownerRef,
    };

    return genericOfferDb.add(offerModel);
  }

  async function addImages(
    images: Express.Multer.File[],
    id: string
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    const flatImagePaths = await createImagesOnPath(
      st,
      `${ImagePaths.OFFERS_IMAGES}${id}/`,
      images
    );

    const updateKey = {
      images: flatImagePaths,
    };

    return genericOfferDb.update<{ images: Array<string> }, "id">({
      field: "id",
      data: updateKey,
      key: id,
    });
  }

  async function addPlanLayouts(
    images: Express.Multer.File[],
    id: string
  ): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    const planImagePaths = await createImagesOnPath(
      st,
      `${ImagePaths.OFFERS_PLAN_IMAGES}${id}/`,
      images
    );
    const currentOffer = await findById({ id });
    const updateKey = {
      additionalInfo: {
        ...currentOffer.fetchedData.additionalInfo,
        planLayout: planImagePaths,
      },
    };

    return genericOfferDb.update<{ additionalInfo: AdditionalInfo }, "id">({
      field: "id",
      data: updateKey,
      key: id,
    });
  }

  async function findAll({
    ownerId,
  }: {
    ownerId?: string;
  }): Promise<DatabaseFunction<Required<Offer>[]> & { _ownerId?: string }> {
    return genericOfferDb.findAll<"ownerId">({
      findKey: ownerId,
      key: "ownerId",
    });
  }

  async function findById({
    id,
  }: {
    id: string;
  }): Promise<DatabaseFunction<Required<Offer>> & { _id?: string }> {
    return genericOfferDb.find<"id">({ findKey: id, key: "id" });
  }

  async function update({
    key,
    data,
  }: {
    key: string;
    data: Required<UpdatedOffer>;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    return genericOfferDb.update<Required<UpdatedOffer>, "id">({
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
    const storageRef = st.ref();
    // remove images from storage
    try {
      await storageRef.child(`${ImagePaths.OFFERS_IMAGES}${key}`).delete();
      await storageRef.child(`${ImagePaths.OFFERS_PLAN_IMAGES}${key}`).delete();
    } catch (e) {
      new FileDeleteException(e);
    }

    // remove id from owner (landlord)
    const ownerRef = await getOwnerRefById(key);
    if (!(await ownerRef.get()).exists) {
      throw new FalsyValueException(
        `Owner ref of offer with id ${key} is empty. Please update your database`
      );
    }
    await ownerRef.delete();

    return genericOfferDb.remove<"id">({ key, field: "id" });
  }
}
