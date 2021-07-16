import express from "express";
import next from "next";
import bodyParser from "body-parser";
import showRoutes from "./routes/index";

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use("/api", showRoutes(server));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, () => {
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex: any) => {
    console.error(ex.stack);
    process.exit(1);
  });
