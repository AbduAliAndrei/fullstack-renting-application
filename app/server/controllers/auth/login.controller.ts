import {UserExtended} from "../../../interfaces/user-extended";
import {HttpRequest} from "../../interfaces/http-request";
import asyncF from "../../../utils/async-f";
import Controller from "../../interfaces/controller";


export default function createLogin(
    { loginUser }: {
        loginUser: ({email, password}: {email: string, password: string}) =>  Promise<[Required<UserExtended>, string]>
    }
) {
    return async function login(httpRequest: HttpRequest) {
        const { source = {}, ...loginInfo } : { source: {}, email: string, password: string } = httpRequest.body;


        const [checked, checkedError] = await asyncF(loginUser({ email:  loginInfo.email, password: loginInfo.password }));

        let result: Controller<Required<UserExtended>>;
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const options = { maxAge: expiresIn, httpOnly: true };

        if (checkedError) {
            result = {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 401,
                body: {
                    error: `Unauthorized, ${checkedError}`
                }
            }
        } else {
            result = {
                cookie: { name: 'session', value: checked[1], options },
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: {
                    res: checked[0]
                }
            }
        }

        return result;
    }
}