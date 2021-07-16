export default interface Controller<T> {
    headers: Record<string, string>;
    statusCode: number;
    body: {
        error?: string
        res?: T;
    }
}