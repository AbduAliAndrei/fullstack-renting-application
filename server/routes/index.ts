import express, { Router } from "express";
import createExpressCallback from "../express-callback";
import controller from "../controllers";
import { SecuredUser } from "../../interfaces/user";
import privateAccessMiddleware from "../middlewares/private-access.middleware";
import currentOnlyAccessMiddleware from "../middlewares/current-user-only-access.middleware";
import uploadFn from "../middlewares/multer-storage.middleware";

const router = express.Router();

function routes(): Router {
  router.get(
    "/auth/check",
    createExpressCallback<SecuredUser>(controller.userController.getCheckedUser)
  );
  router.post(
    "/auth/register",
    createExpressCallback(controller.userController.postRegisterAttempt)
  );
  router.post(
    "/auth/login",
    createExpressCallback(controller.userController.postLogin)
  );
  router.post(
    "/auth/logout",
    createExpressCallback(
      controller.userController.postLogout,
      privateAccessMiddleware
    )
  );

  // users CRUD
  router.get(
    "/users",
    createExpressCallback(controller.userController.getUsers)
  );
  router.get(
    "/users/:id",
    createExpressCallback(controller.userController.getUser)
  );
  router.delete(
    "/users",
    createExpressCallback(
      controller.userController.deleteUser,
      currentOnlyAccessMiddleware
    )
  );
  router.put(
    "/users",
    createExpressCallback(
      controller.userController.putUser,
      currentOnlyAccessMiddleware
    )
  );
  router.put(
    "/users/:id/role",
    createExpressCallback(
      controller.userController.putUserRole,
      currentOnlyAccessMiddleware
    )
  );

  // offers routers
  router.get(
    "/offers",
    createExpressCallback(controller.offerController.getOffers)
  );
  router.post(
    "/offers",
    createExpressCallback(controller.offerController.createOffer)
  );

  router.post(
    "/offers/images/:id",
    uploadFn.fields([
      { name: "images", maxCount: 10 },
      { name: "planLayout", maxCount: 10 },
    ]),
    createExpressCallback(controller.offerController.addImages)
  );

  router.get(
    "/offers/:id",
    createExpressCallback(controller.offerController.getOffer)
  );

  router.put(
    "/offers/:id",
    createExpressCallback(controller.offerController.updateOffer)
  );
  router.delete(
    "/offers/:id",
    createExpressCallback(controller.offerController.deleteOffer)
  );
  // router.post(
  //   "/dummy/check-private",
  //   createExpressCallback(dummyController, privateAccessMiddleware)
  // );

  return router;
}

export default routes;
