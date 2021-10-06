import {UserExtended} from "../../../../interfaces/user-extended";
import asyncF from "../../../../utils/async-f";
import {UserType} from "../../../../enums/use-type";


type LoginUserCreatorParams = {
    takeUser: ({ id }: { id: string, type: UserType }) => Promise<Required<UserExtended>>,
    loginCheck: ( { email, password } : { email: string, password: string } ) => Promise<{ idToken: string, uid: string }>
}

export default function loginUserCreator({ takeUser, loginCheck } : LoginUserCreatorParams) {
    return async function login( { email, password } : { email: string, password: string }): Promise<[Required<UserExtended>, string]> {
        const [loginData, loginDataError] = await asyncF<{ idToken: string, uid: string }>(loginCheck({ email, password }));

        if (loginDataError) {
            throw new Error(`Login Tenant error:  ${loginDataError}`);
        }

        let [user, takeError] = await asyncF<Required<UserExtended>>(takeUser({id: loginData.uid, type: UserType.TENANT}), true);
        if (takeError) {
            console.log('redirecting to take landlord');
            const [landLord, takeErrorLandlord] = await asyncF<Required<UserExtended>>(takeUser({id: loginData.uid, type: UserType.LANDLORD}), true);
            if (takeErrorLandlord) {
                throw new Error(`Landlord or tenant with such id was not found in database. Got ${loginData.uid}.`);
            }

            user = landLord;
        }

        return [user, loginData.idToken];
    }
}