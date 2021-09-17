import express from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {getCheckedUser, postLogin, postRegisterAttempt} from "../controllers/auth";
import {UserExtended} from "../../interfaces/user-extended";

const router = express.Router();

function routes() {
    router.get('/auth/check', createExpressCallback<UserExtended>(getCheckedUser));
    router.post('/auth/register', createExpressCallback(postRegisterAttempt));
    router.post('/auth/tenant', createExpressCallback(postTenant));
    router.post('/auth/login', createExpressCallback(postLogin));

    return router;
}

export default routes