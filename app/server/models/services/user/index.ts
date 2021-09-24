import createAddTenant from "./tenant/create-tenant.service";
import {authVerify, landlordsDb, tenantsDb} from "../../../database";
import createAddLandlord from "./landlord/create-landlord.service";

import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";
import loginUserCreator from "./login.service";
import firebaseLogin from "../../../functions/src/authentication/firebase-login";

const createTenant = createAddTenant({ tenantsDb });
const createLandlord = createAddLandlord({landlordsDb});
const takeUser = takeUserCreator({ tenantsDb, landlordsDb });

const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });
const login = loginUserCreator({takeUser, loginCheck: firebaseLogin});




const commonService = Object.freeze({
    createTenant,
    takeUser,
    createLandlord,
    checkTakeUser,
    login
});

export default commonService;
export { createTenant, createLandlord, checkTakeUser, takeUser, login };
