import { authLogout, authVerify, usersDb } from "../../../database";

import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";
import loginUserCreator from "./login.service";
import firebaseLogin from "../../../functions/src/authentication/firebase-login";
import logoutService from "./logout.service";
import createUserCreator from "./create-user.service";

const createUser = createUserCreator({ db: usersDb });
const takeUser = takeUserCreator({ usersDb });

const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });
const login = loginUserCreator({ takeUser, loginCheck: firebaseLogin });
const logout = logoutService({ authLogout });

const commonService = Object.freeze({
  createUser,
  takeUser,
  checkTakeUser,
  login,
  logout,
});

export default commonService;
export { createUser, checkTakeUser, takeUser, login, logout };
