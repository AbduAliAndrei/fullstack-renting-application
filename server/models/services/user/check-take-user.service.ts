import asyncF from "../../../../utils/async-f";
import { UserExtended } from "../../../../interfaces/user-extended";
import { UserType } from "../../../../enums/use-type";

export type CheckTakeUserCreatorParams = {
  takeUser: ({
    id,
    type,
  }: {
    id: string;
    type: UserType;
  }) => Promise<Required<UserExtended>>;
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
  }): Promise<Required<UserExtended>> {
    const [uid, uidError] = await asyncF<string>(checkAuth({ sessionCookie }));

    if (uidError) {
      throw new Error(`Check Tenant uid error:  ${uidError}`);
    }

    const [tenant, takeError] = await asyncF<Required<UserExtended>>(
      takeUser({ id: uid, type: UserType.TENANT }),
      true
    );

    if (takeError) {
      console.log("redirecting to take landlord");
      const [landLord, takeErrorLandlord] = await asyncF<
        Required<UserExtended>
      >(takeUser({ id: uid, type: UserType.LANDLORD }), true);
      if (takeErrorLandlord) {
        throw new Error(
          `Landlord or tenant with such id was not found in database. Got ${uid}.`
        );
      }

      return landLord;
    }

    return tenant;
  };
}
