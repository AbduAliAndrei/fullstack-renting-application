import db from '../functions/src';
import makeTenantsDb from "./tenants.db";
import makeLandlordsDb from "./landlords.db";
import makeAdminsDb from './admins.db';
import firebaseAuth from "../functions/src/authentication/firebase-auth";
import firebaseAuthVerify from "../functions/src/authentication/firebase-auth-verify";
import firebaseAuthCreate from "../functions/src/authentication/firebase-auth-create";
import firebaseAuthRemove from "../functions/src/authentication/firebase-auth-remove";
import firebaseSignOut from "../functions/src/authentication/firebase-sign-out";

export const tenantsDb = makeTenantsDb({ db });
export const landlordsDb = makeLandlordsDb({ db });
export const adminsDb = makeAdminsDb({db});

export const registerDb = firebaseAuth;
export const authVerify = async ({ sessionCookie }: {sessionCookie: string}) => {
    if (sessionCookie === "") {
        throw new Error('Session cookie invalid');
    }
    const decoded = await firebaseAuthVerify({sessionCookie});
    return decoded.uid;
};
export const authCreate = firebaseAuthCreate;
export const authRemove = firebaseAuthRemove;
export const authLogout = firebaseSignOut;
