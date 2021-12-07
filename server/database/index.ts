import db, { st } from "../functions/src";
import firebaseAuth from "../functions/src/authentication/firebase-auth";
import firebaseAuthVerify from "../functions/src/authentication/firebase-auth-verify";
import firebaseAuthCreate from "../functions/src/authentication/firebase-auth-create";
import firebaseAuthRemove from "../functions/src/authentication/firebase-auth-remove";
import firebaseSignOut from "../functions/src/authentication/firebase-sign-out";
import makeUsersDb from "./users.db";
import makeOffersDb from "./offers.db";

export const usersDb = makeUsersDb({ db });
export const offersDb = makeOffersDb({ db, st });

export const registerDb = firebaseAuth;
export const authVerify = async ({
  sessionCookie,
}: {
  sessionCookie: string;
}): Promise<string> => {
  if (sessionCookie === "") {
    throw new Error("Session cookie invalid");
  }
  const decoded = await firebaseAuthVerify({ sessionCookie });
  return decoded.uid;
};
export const authCreate = firebaseAuthCreate;
export const authRemove = firebaseAuthRemove;
export const authLogout = firebaseSignOut;
