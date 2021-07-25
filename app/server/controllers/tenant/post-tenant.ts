import {Tenant} from "../../../interfaces/Tenant";
import {DatabaseTenant, TenantFunction} from "../../interfaces/DatabaseTenants";
import asyncF from "../../../utils/asyncF";
import Controller from "../../interfaces/Controller";
import {HttpRequest} from "../../interfaces/HttpRequest";

export default function createPostTenant( { createTenant } :
{ createTenant: (tenantInfo: Tenant) => Promise<TenantFunction<DatabaseTenant<Required<Tenant>>>> } ): (h: HttpRequest) => Promise<Controller<DatabaseTenant<Required<Tenant>>>> {
    return async function postTenant(httpRequest: HttpRequest) : Promise<Controller<DatabaseTenant<Required<Tenant>>>> {
        const postProcess = async (): Promise<TenantFunction<DatabaseTenant<Required<Tenant>>>> => {
            const {source = {}, user} = httpRequest.body;
            source.ip = httpRequest.ip;
            source.browser = httpRequest.headers['User-Agent'];
            if (httpRequest.headers['Referer']) {
                source.referer = httpRequest.headers['Referer'];
            }

            return await createTenant({
                ...user,
                source
            });
        }


        const [data, error] = await asyncF<TenantFunction<DatabaseTenant<Required<Tenant>>>>(postProcess());
        let result!: Controller<DatabaseTenant<Required<Tenant>>>;
        if (error) {
            result = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: (error as { message: string }).message
                }
            }
        } else {
           result = {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(data.data.writeTime).toUTCString(),
                },
                statusCode: 201,
                body: { res: data.data }
            }
        }

        return result;
    }
}