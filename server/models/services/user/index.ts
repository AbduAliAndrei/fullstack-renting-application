import { authLogout, authVerify, usersDb } from "../../../database";

import takeUserCreator from "./take-user.service";
import checkTakeUserCreator from "./check-take-user.service";
import loginUserCreator from "./login.service";
import firebaseLogin from "../../../functions/src/authentication/firebase-login";
import logoutService from "./logout.service";
import createUserCreator from "./create-user.service";
import deleteUserService from "./delete-user.service"
import { makeUser } from "../../entities/user";
import updateUserService from "./update-user.service";

const createUser = createUserCreator({ db: usersDb, makeUser: makeUser });
const takeUser = takeUserCreator({ usersDb });

const checkTakeUser = checkTakeUserCreator({ takeUser, checkAuth: authVerify });
const login = loginUserCreator({ takeUser, loginCheck: firebaseLogin });
const logout = logoutService({ authLogout });
const deleteUser = deleteUserService({ usersDb });

const updateUser = updateUserService({ usersDb });

const commonService = Object.freeze({
  createUser,
  takeUser,
  checkTakeUser,
  login,
  logout,
  deleteUser,
  updateUser
});

export default commonService;
export { createUser, checkTakeUser, takeUser, login, logout, deleteUser, updateUser };
