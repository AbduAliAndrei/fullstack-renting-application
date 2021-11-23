import asyncF from "../../../../utils/async-f";
import { User } from "../../../../interfaces/user";

type LoginUserCreatorParams = {
  takeUser: ({ id }: { id: string }) => Promise<Required<User>>;
  loginCheck: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ idToken: string; uid: string }>;
};

export default function loginUserCreator({
  takeUser,
  loginCheck,
}: LoginUserCreatorParams) {
  return async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<[Required<User>, string]> {
    const [loginData, loginDataError] = await asyncF<{
      idToken: string;
      uid: string;
    }>(loginCheck({ email, password }));

    if (loginDataError) {
      throw new Error(`Login User error:  ${loginDataError}`);
    }
    const [user, takeError] = await asyncF<Required<User>>(
      takeUser({ id: loginData.uid })
    );

    if (takeError) {
      throw new Error(
        `No user with such id was found in database. Got ${loginData.uid}.`
      );
    }
    return [user, loginData.idToken];
  };
}
