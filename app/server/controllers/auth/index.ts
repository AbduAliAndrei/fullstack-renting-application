import createRegisterAttempt from "./register.controller";
import {registerDb, authCreate, authRemove} from "../../database";
import createGetCheckedUser from "./check-user.controller";
import { checkTakeUser } from "../../models/use-cases/user";

const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });
const getCheckedUser = createGetCheckedUser({ checkTakeUser });

const AuthController = Object.freeze({
    postRegisterAttempt,
});

export default AuthController;

export { postRegisterAttempt, getCheckedUser };