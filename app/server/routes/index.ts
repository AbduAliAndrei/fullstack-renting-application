import express from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {DatabaseTenant} from "../interfaces/DatabaseTenants";
import {Tenant} from "../../interfaces/Tenant";
import {getCheckedUser, postRegisterAttempt} from "../controllers/auth";
import {getSession} from "../controllers/session";

const router = express.Router();

function routes() {
    router.get('/auth/check', createExpressCallback<Tenant>(getCheckedUser));
    router.post('/auth/register', createExpressCallback<DatabaseTenant<Tenant>>(postRegisterAttempt));
    router.post('/auth/tenant', createExpressCallback<DatabaseTenant<Tenant>>(postTenant));
    router.get('/auth/session', createExpressCallback(getSession));

    return router;
}

export default routes