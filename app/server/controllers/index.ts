import createRegisterAttempt from "./auth/register.controller";
import {authCreate, authRemove, registerDb} from "../database";
import createGetCheckedUser from "./auth/check-user.controller";
import {checkTakeUser, createLandlord, createTenant, login} from "../models/services/user";
import createLogin from "./auth/login.controller";
import createPostTenant from "./user/post-tenant.controller";
import createPostLandlord from "./user/post-landlord.controller";

const postTenant = createPostTenant({ createTenant });
const postLandlord = createPostLandlord( { createLandlord });
const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });
const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });

const controller = Object.freeze({
    postTenant,
    postRegisterAttempt,
    getCheckedUser,
    postLogin,
    postLandlord
});


export default controller;