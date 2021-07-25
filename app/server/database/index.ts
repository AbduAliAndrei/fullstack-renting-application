import db from '../functions/src';
import makeTenantsDb from "./tenants-db";
import firebaseAuth from "../functions/src/authentication/firebaseAuth";
import firebaseAuthVerify from "../functions/src/authentication/firebaseAuthVerify";
import firebaseAuthCreate from "../functions/src/authentication/firebaseAuthCreate";
import firebaseAuthRemove from "../functions/src/authentication/firebaseAuthRemove";

export const tenantsDb = makeTenantsDb({ db });

export const registerDb = firebaseAuth;
export const authVerify = async ({ sessionCookie }: {sessionCookie: string}) => {
    const decoded = await firebaseAuthVerify({sessionCookie});
    return decoded.uid;
};
export const authCreate = firebaseAuthCreate;
export const authRemove = firebaseAuthRemove;
