import createRegisterAttempt from "./register";
import {registerDb, authCreate, authRemove} from "../../database";
import createGetCheckedUser from "./getCheckedUser";
import { takeCheckTenant } from "../../models/use-cases/tenant";

const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });
const getCheckedUser = createGetCheckedUser({ takeCheckedTenant: takeCheckTenant });

const AuthController = Object.freeze({
    postRegisterAttempt,
    getCheckedUser
});

export default AuthController;

export { postRegisterAttempt, getCheckedUser };