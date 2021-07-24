import createRegisterAttempt from "./register";
import {registerDb, authCreate} from "../../database";

const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate })

const AuthController = Object.freeze({
    postRegisterAttempt
});

export default AuthController;

export { postRegisterAttempt };