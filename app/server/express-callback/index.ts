import {Request, Response} from "express";
import Controller from "../interfaces/Controller";
import {HttpRequest} from "../interfaces/HttpRequest";

export default function createExpressCallback<T>(controller:  (h: HttpRequest) => Promise<Controller<T>>) {
    return (req: Request, res:  Response) => {
        console.log(req, res);
        const httpRequest: HttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        };

        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }
                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);
            })
            .catch(e => res.status(500).send('An unknown error occurred.'));
    }
}