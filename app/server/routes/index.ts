import express, { Express } from "express";

const router = express.Router();

function routes(app: Express) {
    router.get("/", (req, res) => {
        res.end("We made it! And it's great");
    });

    return router;
}

export default routes