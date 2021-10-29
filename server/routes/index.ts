import express, { Router } from "express";
import createExpressCallback from "../express-callback";
import controller from "../controllers";
import { UserExtended } from "../../interfaces/user-extended";

const router = express.Router();

function routes(): Router {
  router.get(
    "/auth/check",
    createExpressCallback<UserExtended>(controller.getCheckedUser)
  );
  router.post(
    "/auth/register",
    createExpressCallback(controller.postRegisterAttempt)
  );
  router.post("/auth/login", createExpressCallback(controller.postLogin));
  router.post("/auth/logout", createExpressCallback(controller.postLogout));
  router.delete("/auth", createExpressCallback(controller.deleteUser));

  return router;
}

export default routes;
