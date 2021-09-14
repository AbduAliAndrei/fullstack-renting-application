import createAddTenant from "./tenant/create-tenant.service";
import {tenantsDb, authVerify} from "../../../database";
import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";

const createTenant = createAddTenant({ tenantsDb });
const takeUser = takeUserCreator({ tenantsDb });
const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });


const commonService = Object.freeze({
    createTenant,
    takeUser,
    checkTakeUser
});

export default commonService;
export { createTenant, checkTakeUser, takeUser };
