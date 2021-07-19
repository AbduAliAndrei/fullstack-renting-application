import express, {Express} from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {DatabaseTenant} from "../interfaces/DatabaseTenants";
import {TenantRequest} from "../interfaces/Tenant";

const router = express.Router();

function routes() {
    router.post("/login/tenant", createExpressCallback<DatabaseTenant<TenantRequest>>(postTenant));

    router.get("/login", (req, res) => {
        res.json({
            login: "inProcess"
        });
    })

    return router;
}

export default routes