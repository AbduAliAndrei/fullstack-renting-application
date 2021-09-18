export default async function asyncF<T>(promise: Promise<T>):  Promise<[T | null, unknown | null]> {
    try {
        const data = await promise;
        return [data, null];
    } catch (e) {
        console.error(e);
        return [null, e];
    }
}