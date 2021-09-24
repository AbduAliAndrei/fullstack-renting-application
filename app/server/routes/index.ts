import express from "express";
import createExpressCallback from "../express-callback";
import controller from "../controllers";
import {UserExtended} from "../../interfaces/user-extended";

const router = express.Router();

function routes() {
    router.get('/auth/check', createExpressCallback<UserExtended>(controller.getCheckedUser));
    router.post('/auth/register', createExpressCallback(controller.postRegisterAttempt));
    router.post('/auth/login', createExpressCallback(controller.postLogin));

    return router;
}

export default routes