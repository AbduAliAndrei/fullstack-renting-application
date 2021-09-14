import {HttpRequest} from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import {UserExtended} from "../../../interfaces/user-extended";

export default function createGetSession({ checkTakeUser }: { checkTakeUser: ({ sessionCookie }: {sessionCookie: string}) => Promise<Required<UserExtended>> }) {
    return async function getSession(httpRequest: HttpRequest): Promise<Controller<Record<string, any>>> {
        const session =  httpRequest.cookies.session ?? '';
        const [tenant, tenantError] = await asyncF<Required<UserExtended>>(checkTakeUser({  sessionCookie: session}));

        let result!: Controller<Record<string, any>>;
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
                    res: {
                        tenant: tenant,
                        session: session
                    }
                }
            }
        }
        return result;
    }
}