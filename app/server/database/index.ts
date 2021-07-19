import db from '../functions/src';
import makeTenantsDb from "./tenants-db";

export const tenantsDb = makeTenantsDb({ db });
