import { DatabaseOfferEntity } from "../../../interfaces/databases/offer-database-entity";
import { Offer } from "../../../../interfaces/offer";
import { OfferModel } from "../../../interfaces/models/offer.model";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../../interfaces/database-entity";
import { ImageDest } from "../../../../interfaces/image-dest";
import { isNil } from "../../../../utils/type-checkers";
import FalsyValueException from "../../../exceptions/falsy-value-exception";
import fs from "fs";
import path from "path";

interface AddImagesInterface {
  offersDb: DatabaseOfferEntity<Offer, OfferModel>;
}

export default function addImagesCreator({ offersDb }: AddImagesInterface) {
  return async function ({
    images,
    offerId,
  }: {
    images: Record<ImageDest, Express.Multer.File[]>;
    offerId: string;
  }): Promise<DatabaseFunction<DatabaseObject<Required<Offer>>>> {
    if (isNil(images)) {
      throw new FalsyValueException("Images dont exist.");
    }
    let result: DatabaseFunction<DatabaseObject<Required<Offer>>>;
    if (images["images"]) {
      result = await offersDb.addImages(images.images, offerId);
    }

    if (images.planLayout) {
      result = await offersDb.addPlanLayouts(images.planLayout, offerId);
    }

    if (!result || !result.fetchedData) {
      throw new FalsyValueException(`Fetched data is undefined in ${result}`);
    }

    fs.rmdirSync(path.join(__dirname, "../../../temp"), { recursive: true });

    return result;
  };
}
