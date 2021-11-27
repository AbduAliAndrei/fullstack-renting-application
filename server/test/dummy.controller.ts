import Controller from "../interfaces/controller";

const dummyController = async (): Promise<Controller<Required<unknown>>> => {
  return await new Promise((resolve) => {
    setTimeout(
      () => resolve({ headers: {}, statusCode: 200, body: { res: "success" } }),
      20
    );
  });
};

export default dummyController;
