import asyncF from "../../../../utils/async-f";
import { SecuredUser } from "../../../../interfaces/user";

export type CheckTakeUserCreatorParams = {
  takeUser: ({ id }: { id: string }) => Promise<Required<SecuredUser>>;
  checkAuth: ({ sessionCookie }: { sessionCookie: string }) => Promise<string>;
};

export default function checkTakeUserCreator({
  takeUser,
  checkAuth,
}: CheckTakeUserCreatorParams) {
  return async function ({
    sessionCookie,
  }: {
    sessionCookie: string;
  }): Promise<Required<SecuredUser>> {
    const [uid, uidError] = await asyncF<string>(checkAuth({ sessionCookie }));

    if (uidError) {
      throw new Error(`Check user uid error:  ${uidError}`);
    }
    const [user, userError] = await asyncF(takeUser({ id: uid }));

    if (userError) {
      throw new Error(
        `User with such id was not found in database. Got ${uid}.`
      );
    }

    return user;
  };
}
