import asyncF from "../../../../utils/async-f";
import { UserExtended } from "../../../../interfaces/user-extended";
import { UserType } from "../../../../enums/user-type";
import { CheckTakeUserCreatorParams } from "../../../interfaces/services/check-take-user.type";

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
      takeUser({ id: uid, type: UserType.TENANT })
    );

    if (takeError) {
      console.log("redirecting to take landlord");
      const [landLord, takeErrorLandlord] = await asyncF<
        Required<UserExtended>
      >(takeUser({ id: uid, type: UserType.LANDLORD }));
      if (takeErrorLandlord) {
        console.log(`redirecting to take admin`);
        const [admin, takeErrorAdmin] = await asyncF<Required<UserExtended>>(
          takeUser({ id: uid, type: UserType.ADMIN })
        );

        if (takeErrorAdmin) {
          throw new Error(
            `No Admin, Landlord nor tenant with such id was not found in database. Got ${uid}.`
          );
        }
        return admin;
      }

      return landLord;
    }

    return tenant;
  };
}
