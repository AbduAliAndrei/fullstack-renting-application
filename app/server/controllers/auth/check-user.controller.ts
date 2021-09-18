import {HttpRequest} from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import {UserExtended} from "../../../interfaces/user-extended";

export default function createUserChecker({ checkTakeUser }: { checkTakeUser: ({ sessionCookie }: {sessionCookie: string}) => Promise<Required<UserExtended>> })  {
    return async function checkAttempt(httpRequest: HttpRequest) {
        const { source: {}, ...data }: { source: {}, sessionCookie: string  } = httpRequest.body;
        const [tenant, tenantError] = await asyncF<Required<UserExtended>>(checkTakeUser({  sessionCookie: data.sessionCookie}));

        let result!: Controller<Required<UserExtended>>;
        if (tenantError) {
            result = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 404,
                body: {
                    error: tenantError as string
                }
            }
        } else {
            result = {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: {
                    res: tenant
                }
            }
        }
        return result;
    }
}