import createAddTenant from "./tenant/create-tenant.service";
import {authVerify, landlordsDb, tenantsDb,adminsDb} from "../../../database";
import createAddLandlord from "./landlord/create-landlord.service";
import createAddAdmin from "./admin/create-admin.service";
import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";
import loginUserCreator from "./login.service";
import firebaseLogin from "../../../functions/src/authentication/firebase-login";

const createTenant = createAddTenant({ tenantsDb });
const createLandlord = createAddLandlord({landlordsDb});
const createAdmin = createAddAdmin({adminsDb});
const takeUser = takeUserCreator({ tenantsDb, landlordsDb ,adminsDb});

const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });
const login = loginUserCreator({takeUser, loginCheck: firebaseLogin});




const commonService = Object.freeze({
    createTenant,
    createLandlord,
    createAdmin,
    takeUser,
    checkTakeUser,
    login
});

export default commonService;
export { createTenant, createAdmin, createLandlord ,checkTakeUser, takeUser, login };
