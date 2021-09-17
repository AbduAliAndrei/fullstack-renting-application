import {HttpRequest} from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import {UseType} from "../../../enums/use-type";
import {Tenant} from "../../../interfaces/tenant";
import Landlord from "../../../interfaces/landlord";
import {postTenant} from "../tenant";
import Controller from "../../interfaces/controller";
import {DatabaseObject} from "../../interfaces/database-entity";

export default function createRegisterAttempt
( { createUser, authCreate, authRemove } :
      {
          createUser: ({password, email}: {password: string, email: string}) => Promise<{uid: string, idToken: string}>,
          authCreate: ({idToken, expire}: {idToken: string, expire: number}) => Promise<string>,
          authRemove: ({uid}: { uid: string }) => Promise<void>
      })
{
    return async function registerAttempt(httpRequest: HttpRequest) {
        const { source = {}, ...loginInfo } : { source: {}, userType: UseType, user: Tenant | Landlord } = httpRequest.body;

        const [created, createdError] = await asyncF(createUser({password: loginInfo.user.password, email: loginInfo.user.email}));
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        if (createdError) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 409,
                body: {
                    error: `Couldn't create user, Error: ${createdError}`
                }
            }
        }

        const [sessionCookie, sessionCookieError] = await asyncF(authCreate({idToken: created.idToken, expire: expiresIn}));

        let result: Controller<DatabaseObject<Required<Tenant>>>;
        const options = { maxAge: expiresIn, httpOnly: true }

        if (sessionCookieError) {
            result = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 401,
                body: {
                    error: `Unauthorized, ${sessionCookieError}`
                }
            }
        } else if (loginInfo.userType === UseType.TENANT) {
            loginInfo.user.id = created.uid;
            httpRequest.body = { source, user: loginInfo.user }
            result = await postTenant(httpRequest);
            if (result.body.error) {
                await authRemove({uid: created.uid});
                return result;
            }
            result.cookie = { name: 'session', value: sessionCookie, options }
        } else {
            await authRemove({uid: created.uid});
            result = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 503,
                body: {
                    error: 'Feature is not available yet. Landlord user type is unavailable.'
                }
            }
        }

        return result;
    };
}