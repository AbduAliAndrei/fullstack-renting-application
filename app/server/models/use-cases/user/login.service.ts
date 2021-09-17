import {UserExtended} from "../../../../interfaces/user-extended";
import asyncF from "../../../../utils/async-f";


type LoginUserCreatorParams = {
    takeUser: ({ id }: { id: string }) => Promise<Required<UserExtended>>,
    loginCheck: ( { email, password } : { email: string, password: string } ) => Promise<{ idToken: string, uid: string }>
}

export default function loginUserCreator({ takeUser, loginCheck } : LoginUserCreatorParams) {
    return async function login( { email, password } : { email: string, password: string }): Promise<[Required<UserExtended>, string]> {
        const [loginData, loginDataError] = await asyncF<{ idToken: string, uid: string }>(loginCheck({ email, password }));

        if (loginDataError) {
            throw new Error(`Login Tenant error:  ${loginDataError}`);
        }

        const [user, takeError] = await asyncF<Required<UserExtended>>(takeUser({id: loginData.uid}));

        if (takeError) {
            throw new Error(`Take tenant error: ${takeError}`);
        }

        return [user, loginData.idToken];
    }
}