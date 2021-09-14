import {UserExtended} from "../../../interfaces/user-extended";
import {HttpRequest} from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";


export default function createLogin(
    { checkTakeUser }: {
        checkTakeUser: ({sessionCookie}: {sessionCookie: string}) =>  Promise<Required<UserExtended>>
    }
) {
    return async function login(httpRequest: HttpRequest) {
        const { source = {}, ...loginInfo } : { source: {}, sessionCookie: string } = httpRequest.body;


        const [checked, checkedError] = await asyncF(checkTakeUser({ sessionCookie: loginInfo.sessionCookie }));

        if (checkedError) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 401,
                body: {
                    error: `Unauthorized, ${checkedError}`
                }
            }
        }

        return checked;
    }
}