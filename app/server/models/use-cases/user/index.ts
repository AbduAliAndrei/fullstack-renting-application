import createAddTenant from "./tenant/create-tenant.service";
import {tenantsDb, authVerify} from "../../../database";
import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";
import loginUserCreator from "./login.service";
import firebaseLogin from "../../../functions/src/authentication/firebase-login";

const createTenant = createAddTenant({ tenantsDb });
const takeUser = takeUserCreator({ tenantsDb });
const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });
const login = loginUserCreator({takeUser, loginCheck: firebaseLogin});


const commonService = Object.freeze({
    createTenant,
    takeUser,
    checkTakeUser,
    login
});

export default commonService;
export { createTenant, checkTakeUser, takeUser, login };
