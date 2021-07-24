import db from '../functions/src';
import makeTenantsDb from "./tenants-db";
import firebaseAuth from "../functions/src/authentication/firebaseAuth";
import firebaseAuthVerify from "../functions/src/authentication/firebaseAuthVerify";
import firebaseAuthCreate from "../functions/src/authentication/firebaseAuthCreate";

export const tenantsDb = makeTenantsDb({ db });

export const registerDb = firebaseAuth;
export const authVerify = firebaseAuthVerify;
export const authCreate = firebaseAuthCreate;
