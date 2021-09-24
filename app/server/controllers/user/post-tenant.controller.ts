import {Tenant} from "../../../interfaces/tenant";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";
import {HttpRequest} from "../../interfaces/http-request";
import { DatabaseFunction, DatabaseObject} from "../../interfaces/database-entity";

export default function createPostTenant( { createTenant } :
{ createTenant: (tenantInfo: Tenant) => Promise<DatabaseFunction<DatabaseObject<Required<Tenant>>>> } ): (h: HttpRequest) => Promise<Controller<DatabaseObject<Required<Tenant>>>> {
    return async function postTenant(httpRequest: HttpRequest) : Promise<Controller<DatabaseObject<Required<Tenant>>>> {
        const postProcess = async (): Promise<DatabaseFunction<DatabaseObject<Required<Tenant>>>> => {
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


        const [data, error] = await asyncF<DatabaseFunction<DatabaseObject<Required<Tenant>>>>(postProcess());
        let result!: Controller<DatabaseObject<Required<Tenant>>>;
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