import createRegisterAttempt from "../auth/register.controller";
import { authCreate, authRemove, registerDb } from "../../database";
import createGetCheckedUser from "../auth/check-user.controller";
import {
  checkTakeUser,
  login,
  logout,
  createUser,
  deleteUser as deleteUserService,
  updateUser,
  takeUser,
  takeUsers,
  updateUserRole,
} from "../../models/services/user";
import createLogin from "../auth/login.controller";
import createLogout from "../auth/logout.controller";
import createPostUser from "./post-user.controller";
import createDeleteUser from "./delete-user.controller";
import createUpdateUser from "./update-user.controller";
import createGetUser from "./get-user.controller";
import createGetUsers from "./get-users.controller";
import createUpdateUserRole from "./update-user-role.controller";

const postUser = createPostUser({ createUser });

const postRegisterAttempt = createRegisterAttempt({
  createUser: registerDb,
  authCreate,
  authRemove,
});

const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });
const postLogout = createLogout({ logoutService: logout });
const deleteUser = createDeleteUser({
  deleteUser: deleteUserService,
  authRemove,
});
const putUser = createUpdateUser({ putUser: updateUser });
const getUser = createGetUser({ getUser: takeUser });
const getUsers = createGetUsers({ getUsers: takeUsers });
const putUserRole = createUpdateUserRole({ updateRole: updateUserRole });

const userController = Object.freeze({
  postUser,
  postRegisterAttempt,
  getCheckedUser,
  postLogin,
  postLogout,
  deleteUser,
  putUser,
  getUser,
  getUsers,
  putUserRole,
});

export default userController;
