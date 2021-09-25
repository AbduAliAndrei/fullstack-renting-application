import asyncF from "../../../../utils/async-f";
import {UserExtended} from "../../../../interfaces/user-extended";

export type CheckTakeUserCreatorParams = {
    takeUser: ({ id }: { id: string }) => Promise<Required<UserExtended>>,
    checkAuth: ({ sessionCookie }: {sessionCookie: string}) => Promise<string>
}

export default function checkTakeUserCreator({ takeUser, checkAuth }: CheckTakeUserCreatorParams)
{
    return async function checkTakeTenant({ sessionCookie }: { sessionCookie: string }): Promise<Required<UserExtended>> {
        const [uid, uidError] = await asyncF<string>(checkAuth({  sessionCookie }));

        if (uidError) {
            throw new Error(`Check Tenant uid error:  ${uidError}`);
        }

        const [tenant, takeError] = await asyncF<Required<UserExtended>>(takeUser({id: uid}));

        if (takeError) {
            throw new Error((`Take Tenant error: ${takeError}`));
        }

        return tenant;
    }
}