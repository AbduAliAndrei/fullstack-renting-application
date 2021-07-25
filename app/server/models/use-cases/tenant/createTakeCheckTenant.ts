import {Tenant} from "../../../../interfaces/Tenant";
import asyncF from "../../../../utils/asyncF";

export default function createCheckTakeTenant({ takeTenant, checkAuth }:
{
    takeTenant: ({ id }: { id: string }) => Promise<Required<Tenant>>,
    checkAuth: ({ sessionCookie }: {sessionCookie: string}) => Promise<string>
})
{
    return async function checkTakeTenant({ sessionCookie }: { sessionCookie: string }): Promise<Required<Tenant>> {
        const [uid, uidError] = await asyncF<string>(checkAuth({  sessionCookie }));

        if (uidError) {
            throw new Error(`Check Tenant uid error:  ${uidError}`);
        }

        const [tenant, takeError] = await asyncF<Required<Tenant>>(takeTenant({id: uid}));

        if (takeError) {
            throw new Error((`Take Tenant error: ${takeError}`));
        }

        return tenant;
    }
}