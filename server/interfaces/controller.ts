import {CookieOptions} from "express";

export default interface Controller<T> {
    headers: Record<string, string>;
    statusCode: number;
    body: {
        error?: string
        res?: T;
    },
    cookie?: {
        name: string;
        value: string;
        options: CookieOptions;
    }
}