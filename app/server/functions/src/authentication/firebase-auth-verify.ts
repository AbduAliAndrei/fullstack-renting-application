import admin from "firebase-admin";
import {auth} from "firebase-admin/lib/auth";
import DecodedIdToken = auth.DecodedIdToken;

export default async ({sessionCookie}: {sessionCookie: string}):
    Promise<DecodedIdToken> => admin
    .auth()
    .verifySessionCookie(sessionCookie, true);
