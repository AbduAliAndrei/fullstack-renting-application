import db from '../src/index';
import makeTenantsDb from "./tenants-db";

export const tenantsDb = makeTenantsDb({ db });
