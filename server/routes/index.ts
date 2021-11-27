import express, { Router } from "express";
import createExpressCallback from "../express-callback";
import controller from "../controllers";
import { SecuredUser } from "../../interfaces/user";
import privateAccessMiddleware from "../middlewares/private-access.middleware";
import currentOnlyAccessMiddleware from "../middlewares/current-user-only-access.middleware";

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

  // users CRUD
  router.get("/users", createExpressCallback(controller.getUsers));
  router.get("/users/:id", createExpressCallback(controller.getUser));
  router.delete(
    "/users",
    createExpressCallback(controller.deleteUser, currentOnlyAccessMiddleware)
  );
  router.put(
    "/users",
    createExpressCallback(controller.putUser, currentOnlyAccessMiddleware)
  );
  router.put(
    "users/:id",
    createExpressCallback(controller.putUserRole, currentOnlyAccessMiddleware)
  );

  // router.post(
  //   "/dummy/check-private",
  //   createExpressCallback(dummyController, privateAccessMiddleware)
  // );

  return router;
}

export default routes;
