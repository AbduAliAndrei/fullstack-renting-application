import createRegisterAttempt from "./auth/register.controller";
import {authCreate, authRemove, registerDb} from "../database";
import createGetCheckedUser from "./auth/check-user.controller";
import {checkTakeUser, createLandlord, createTenant, createAdmin, login, logout} from "../models/services/user";
import createLogin from "./auth/login.controller";
import createPostTenant from "./user/post-tenant.controller";
import createPostLandlord from "./user/post-landlord.controller";
import createLogout from "./auth/logout.controller";

import createPostAdmin from "./user/post-admin.controller";
const postTenant = createPostTenant({ createTenant });
const postLandlord = createPostLandlord( { createLandlord });
const postAdmin = createPostAdmin({createAdmin});
const postRegisterAttempt = createRegisterAttempt({ createUser: registerDb, authCreate, authRemove });
const getCheckedUser = createGetCheckedUser({ checkTakeUser });
const postLogin = createLogin({ loginUser: login, authCreate });
const postLogout = createLogout({ logoutService: logout });

const controller = Object.freeze({
    postTenant,
    postRegisterAttempt,
    postAdmin,
    getCheckedUser,
    postLogin,
    postLandlord,
    postLogout
});


export default controller;