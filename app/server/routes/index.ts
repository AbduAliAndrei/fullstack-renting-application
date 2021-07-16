import express, {Express, Request} from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {DatabaseTenant} from "../interfaces/DatabaseTenants";
import Tenant from "../interfaces/Tenant";

const router = express.Router();

function routes(app: Express) {
    router.get("/", (req: Request, res) => {
        res.json({});
    });

    router.post("/login/tenant", createExpressCallback<DatabaseTenant<Tenant>>(postTenant));

    return router;
}

export default routes