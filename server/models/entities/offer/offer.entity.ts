import { CustomId } from "../../../interfaces/id";
import add from "date-fns/add";

export default function buildMakeOffer({
  Id,
  validate,
}: {
  Id: CustomId;
  validate: any;
}) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-empty-function
  return function makeOffer({
    ownerId,
    generalInfo,
    additionalInfo,
    images,
    validUntil,
    validFrom,
    expiresAt = add(new Date(), { months: 6 }) as Date,
    nextOffer = null,
    prevOffer = null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }) {};
}
