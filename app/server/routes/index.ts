import express, { Express } from "express";

const router = express.Router();

function routes(app: Express) {
    router.get("/", (req, res) => {
        res.json({});
    });

    return router;
}

export default routes