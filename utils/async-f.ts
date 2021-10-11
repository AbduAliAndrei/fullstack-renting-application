export default async function asyncF<T>(
  promise: Promise<T>,
  blockLogs?: boolean
): Promise<[T | null, unknown | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (e) {
    if (!blockLogs) {
      console.error(e);
    }
    return [null, e];
  }
}
