import createRegisterAttempt from "./auth/register.controller";
import { authCreate, authRemove, registerDb } from "../database";
import createGetCheckedUser from "./auth/check-user.controller";
import {
  checkTakeUser,
  login,
  logout,
  createUser,
} from "../models/services/user";
import createLogin from "./auth/login.controller";
import createLogout from "./auth/logout.controller";
import createPostUser from "./user/post-user.controller";

const postUser = createPostUser({ createUser });

const postRegisterAttempt = createRegisterAttempt({
  createUser: registerDb,
  authCreate,
  authRemove,
});

const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });
const postLogout = createLogout({ logoutService: logout });

const controller = Object.freeze({
  postUser,
  postRegisterAttempt,
  getCheckedUser,
  postLogin,
  postLogout,
});

export default controller;
