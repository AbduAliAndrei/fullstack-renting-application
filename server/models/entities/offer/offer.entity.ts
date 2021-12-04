import { CustomId } from "../../../interfaces/id";

export default function buildMakeOffer({
  Id,
  validate,
}: {
  Id: CustomId;
  validate: any;
}) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-empty-function
  return function makeOffer({ ownerId, generalInfo, additionalInfo }) {};
}
