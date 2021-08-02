import {HttpRequest} from "../../interfaces/HttpRequest";
import Controller from "../../interfaces/Controller";
import {Tenant} from "../../../interfaces/Tenant";
import asyncF from "../../../utils/asyncF";

export default function createGetSession({ takeCheckedTenant }: { takeCheckedTenant: ({ sessionCookie }: {sessionCookie: string}) => Promise<Required<Tenant>> }) {
    return async function getSession(httpRequest: HttpRequest): Promise<Controller<Record<string, any>>> {
        const session =  httpRequest.cookies.session ?? '';
        const [tenant, tenantError] = await asyncF<Required<Tenant>>(takeCheckedTenant({  sessionCookie: session}));

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