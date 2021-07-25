import {HttpRequest} from "../../interfaces/HttpRequest";
import asyncF from "../../../utils/asyncF";
import {UserType} from "../../../enums/UserType";
import {Tenant} from "../../../interfaces/Tenant";
import Landlord from "../../../interfaces/Landlord";
import {postTenant} from "../tenant";
import Controller from "../../interfaces/Controller";
import {DatabaseTenant} from "../../interfaces/DatabaseTenants";

export default function createRegisterAttempt
( { createUser, authCreate, authRemove } :
      {
          createUser: ({password, email}: {password: string, email: string}) => Promise<{uid: string, idToken: string}>,
          authCreate: ({idToken, expire}: {idToken: string, expire: number}) => Promise<string>,
          authRemove: ({uid}: { uid: string }) => Promise<void>
      })
{
    return async function registerAttempt(httpRequest: HttpRequest) {
        const { source = {}, ...loginInfo } : { source: {}, userType: UserType, user: Tenant | Landlord } = httpRequest.body;

        const [created, createdError] = await asyncF(createUser({password: loginInfo.user.password, email: loginInfo.user.email}));
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        if (createdError) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 401,
                body: {
                    error: `Unauthorized, ${createdError}`
                }
            }
        }

        const [sessionCookie, sessionCookieError] = await asyncF(authCreate({idToken: created.idToken, expire: expiresIn}));

        let result: Controller<DatabaseTenant<Required<Tenant>>>;
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
        } else if (loginInfo.userType === UserType.TENANT) {
            loginInfo.user.id = created.uid;
            httpRequest.body = { source, user: loginInfo.user }
            result = await postTenant(httpRequest);
            if (result.body.error) {
                await authRemove({uid: created.uid});
            }
            result.cookie = { value: sessionCookie, options }
        } else {
            result = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 503,
                body: {
                    error: 'Feature is not available yet'
                }
            }
        }

        return result;
    };
}