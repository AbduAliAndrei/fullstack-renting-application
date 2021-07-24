import express from "express";
import createExpressCallback from "../express-callback";
import {postTenant} from "../controllers/tenant";
import {DatabaseTenant} from "../interfaces/DatabaseTenants";
import {Tenant} from "../../interfaces/Tenant";
import db from "../functions/src";
import {postRegisterAttempt} from "../controllers/auth";

const router = express.Router();

function routes() {
    router.post('/auth/login', createExpressCallback<DatabaseTenant<Tenant>>(postRegisterAttempt));
    router.post("/auth/tenant", createExpressCallback<DatabaseTenant<Tenant>>(postTenant));

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

    router.get("/auth", (req, res) => {
        res.json({
            login: "inProcess"
        });
    })

    return router;
}

export default routes