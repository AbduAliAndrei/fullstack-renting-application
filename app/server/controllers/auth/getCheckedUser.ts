import {HttpRequest} from "../../interfaces/HttpRequest";
import asyncF from "../../../utils/asyncF";
import {Tenant} from "../../../interfaces/Tenant";
import Controller from "../../interfaces/Controller";

export default function createGetCheckedUser({ takeCheckedTenant }: { takeCheckedTenant: ({ sessionCookie }: {sessionCookie: string}) => Promise<Required<Tenant>> })  {
    return async function checkAttempt(httpRequest: HttpRequest) {
        const { source: {}, ...data }: { source: {}, data: { sessionCookie: string } } = httpRequest.body;

        const [tenant, tenantError] = await asyncF<Required<Tenant>>(takeCheckedTenant({  sessionCookie: data.data.sessionCookie}));

        let result!: Controller<Required<Tenant>>;
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