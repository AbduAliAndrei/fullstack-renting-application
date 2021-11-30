import express, { Router } from "express";
import createExpressCallback from "../express-callback";
import controller from "../controllers";
import { SecuredUser } from "../../interfaces/user";
import privateAccessMiddleware from "../middlewares/private-access.middleware";

const router = express.Router();

function routes(): Router {
  router.get(
    "/auth/check",
    createExpressCallback<SecuredUser>(controller.getCheckedUser)
  );
  router.post(
    "/auth/register",
    createExpressCallback(controller.postRegisterAttempt)
  );
  router.post("/auth/login", createExpressCallback(controller.postLogin));
  router.post(
    "/auth/logout",
    createExpressCallback(controller.postLogout, privateAccessMiddleware)
  );
  // router.post(
  //   "/dummy/check-private",
  //   createExpressCallback(dummyController, privateAccessMiddleware)
  // );

  return router;
}

export default routes;
