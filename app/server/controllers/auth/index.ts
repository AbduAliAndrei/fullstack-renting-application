import createRegisterAttempt from "./register.controller";
import {registerDb, authCreate, authRemove} from "../../database";
import createGetCheckedUser from "./check-user.controller";
import { checkTakeUser, login } from "../../models/use-cases/user";
import createLogin from "./login.controller";

const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });
const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });

const AuthController = Object.freeze({
    postRegisterAttempt,
    postLogin
});

export default AuthController;

export { postRegisterAttempt, getCheckedUser, postLogin };