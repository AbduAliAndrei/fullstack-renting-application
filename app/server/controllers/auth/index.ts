import createRegisterAttempt from "./register";
import {registerDb, authCreate, authRemove} from "../../database";

const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });

const AuthController = Object.freeze({
    postRegisterAttempt
});

export default AuthController;

export { postRegisterAttempt };