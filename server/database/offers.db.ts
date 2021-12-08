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
      validUntil: new Date(doc.data().validUntil),
      validFrom: new Date(doc.data().validFrom),
      expiresAt: doc.data().expiresAt.toDate(),
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
    // put images to storage -> done in separate functions

    const offerModel: Required<OfferModel> = {
      ...offerInfo,
      getOwner: () => ownerRef,
    };

    const offer = await genericOfferDb.add(offerModel);
    await ownerRef.update({
      role: {
        ...role,
        offerList: [...role.offerList, offer.fetchedData.data.id],
      },
    });
    return offer;
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

    return await genericOfferDb.update<{ images: Array<string> }, "id">({
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

    return await genericOfferDb.update<
      { additionalInfo: AdditionalInfo },
      "id"
    >({
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
    // remove images from storage
    try {
      const flatImages = await st
        .ref(`${ImagePaths.OFFERS_IMAGES}${key}`)
        .listAll();
      flatImages.items.map((fileRef) => {
        fileRef.delete();
      });
      const planImages = await st
        .ref(`${ImagePaths.OFFERS_PLAN_IMAGES}${key}`)
        .listAll();
      planImages.items.map((fileRef) => fileRef.delete());
    } catch (e) {
      new FileDeleteException(e);
    }

    const currentOffer = await findById({ id: key });
    // remove id from owner (landlord)
    const ownerRef = await getOwnerRefById(currentOffer.fetchedData.ownerId);
    if (!(await ownerRef.get()).exists) {
      throw new FalsyValueException(
        `Owner ref of offer with id ${currentOffer.fetchedData.ownerId} is empty. Please update your database`
      );
    }

    const role: Role = (await ownerRef.get()).data().role;
    if (role.role !== UserType.LANDLORD) {
      throw new WrongUserTypeException(role.role, UserType.LANDLORD);
    }
    await ownerRef.update({
      role: { ...role, offerList: role.offerList.filter((i) => i !== key) },
    });

    return genericOfferDb.remove<"id">({ key, field: "id" });
  }
}
