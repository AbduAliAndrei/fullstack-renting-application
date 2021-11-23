import express, { Router } from "express";
import createExpressCallback from "../express-callback";
import controller from "../controllers";
import { User } from "../../interfaces/user";

const router = express.Router();

function routes(): Router {
  router.get(
    "/auth/check",
    createExpressCallback<User>(controller.getCheckedUser)
  );
  router.post(
    "/auth/register",
    createExpressCallback(controller.postRegisterAttempt)
  );
  router.post("/auth/login", createExpressCallback(controller.postLogin));
  router.post("/auth/logout", createExpressCallback(controller.postLogout));

  return router;
}

export default routes;
