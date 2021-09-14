import express from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {getCheckedUser, postRegisterAttempt} from "../controllers/auth";
import {getSession} from "../controllers/session";
import {UserExtended} from "../../interfaces/user-extended";

const router = express.Router();

function routes() {
    router.get('/auth/check', createExpressCallback<UserExtended>(getCheckedUser));
    router.post('/auth/register', createExpressCallback(postRegisterAttempt));
    router.post('/auth/tenant', createExpressCallback(postTenant));
    router.get('/auth/session', createExpressCallback(getSession));

    return router;
}

export default routes