import Landlord from "../../../../interfaces/Landlord";
import asyncF from "../../../../utils/asyncF";

export default function createCheckTakeLandlord({ takeLandlord , checkAuth }:
{
    takeLandlord: ({ id }: { id: string }) => Promise<Required<Landlord>>,
    checkAuth: ({ sessionCookie }: {sessionCookie: string}) => Promise<string>
})
{
    return async function checkTakeTenant({ sessionCookie }: { sessionCookie: string }): Promise<Required<Landlord>> {
        const [uid, uidError] = await asyncF<string>(checkAuth({  sessionCookie }));

        if (uidError) {
            throw new Error(`Check Tenant uid error:  ${uidError}`);
        }

        const [landlord, takeError] = await asyncF<Required<Landlord>>(takeLandlord({id: uid}));

        if (takeError) {
            throw new Error((`Take Tenant error: ${takeError}`));
        }

        return landlord;
    }
}