import createRegisterAttempt from "./auth/register.controller";
import { authCreate, authRemove, registerDb } from "../database";
import createGetCheckedUser from "./auth/check-user.controller";
import {
  checkTakeUser,
  login,
  logout,
  createUser,
  deleteUser  as deleteUserService,
  updateUser,
} from "../models/services/user";
import createLogin from "./auth/login.controller";
import createLogout from "./auth/logout.controller";
import createPostUser from "./user/post-user.controller";
import createDeleteUser from "./user/delete-user.controller";
import createUpdateUser from "./user/update-user.controller";

const postUser = createPostUser({ createUser });

const postRegisterAttempt = createRegisterAttempt({
  createUser: registerDb,
  authCreate,
  authRemove,
});

const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });
const postLogout = createLogout({ logoutService: logout });
const deleteUser= createDeleteUser( { deleteUser: deleteUserService, authRemove });
const putUser = createUpdateUser ({ putUser : updateUser });


const controller = Object.freeze({
  postUser,
  postRegisterAttempt,
  getCheckedUser,
  postLogin,
  postLogout,
  deleteUser,
  putUser
});

export default controller;
