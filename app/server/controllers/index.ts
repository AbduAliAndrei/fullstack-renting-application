import createRegisterAttempt from "./auth/register.controller";
import {authCreate, authRemove, registerDb} from "../database";
import createGetCheckedUser from "./auth/check-user.controller";
import {checkTakeUser, createTenant, login} from "../models/services/user";
import createLogin from "./auth/login.controller";
import createPostTenant from "./user/post-tenant.controller";

const postTenant = createPostTenant({ createTenant });
const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });
const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });

const controller = Object.freeze({
    postTenant,
    postRegisterAttempt,
    getCheckedUser,
    postLogin
});


export default controller;