import createAddTenant from "./tenant/create-tenant.service";
import {
  authLogout,
  authVerify,
  landlordsDb,
  tenantsDb,
  adminsDb,
} from "../../../database";
import createAddLandlord from "./landlord/create-landlord.service";
import createAddAdmin from "./admin/create-admin.service";
import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";
import loginUserCreator from "./login.service";
import firebaseLogin from "../../../functions/src/authentication/firebase-login";
import logoutService from "./logout.service";
import deleteUserService from "./delete-user.service";
import updateUserService from "./update-user.service";

const createTenant = createAddTenant({ tenantsDb });
const createLandlord = createAddLandlord({ landlordsDb });
const createAdmin = createAddAdmin({ adminsDb });
const takeUser = takeUserCreator({ tenantsDb, landlordsDb, adminsDb });

const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });
const login = loginUserCreator({ takeUser, loginCheck: firebaseLogin });
const logout = logoutService({ authLogout });

const deleteUser = deleteUserService({ tenantsDb, landlordsDb, adminsDb });
const updateUser = updateUserService({ tenantsDb, landlordsDb, adminsDb });

const commonService = Object.freeze({
  createTenant,
  takeUser,
  createLandlord,
  createAdmin,
  checkTakeUser,
  login,
  logout,
  deleteUser,
  updateUser,
});

export default commonService;
export {
  createTenant,
  createAdmin,
  createLandlord,
  checkTakeUser,
  takeUser,
  login,
  logout,
  deleteUser,
  updateUser,
};
