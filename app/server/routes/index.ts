import express from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {DatabaseTenant} from "../interfaces/DatabaseTenants";
import {TenantRequest} from "../interfaces/Tenant";
import db from "../functions/src";

const router = express.Router();

function routes() {
    router.post("/login/tenant", createExpressCallback<DatabaseTenant<TenantRequest>>(postTenant));

    router.get('/all-collections', (req, res) => {
        db.listCollections()
            .then((snapshot)=>{
                let snapshots = [];
                snapshot.forEach(snaps => {
                    console.log(snaps["_queryOptions"].collectionId); // LIST OF ALL COLLECTIONS
                    snapshots.push(snaps["_queryOptions"].collectionId);
                });

                return snapshots;
            })
            .then(s => {
                res.json({
                    respond: s
                })
            })
            .catch(error => console.error(error));
    });

    router.get("/login", (req, res) => {
        res.json({
            login: "inProcess"
        });
    })

    return router;
}

export default routes