import isEqual from "lodash/isEqual";

export function intersectArray<T>(arrOne: T[], arrTwo: T[]): T[] {
  const intersection: T[] = [];
  for (const el1 of arrOne) {
    for (const el2 of arrTwo) {
      if (isEqual(el2, el1)) {
        intersection.push(el1);
      }
    }
  }
  return intersection;
}
