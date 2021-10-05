import {authVerify} from "../database";
import { Request, Response } from "express";
import asyncF from "../../utils/async-f";
import {PrivateRoutes, PublicOnlyRoutes} from "../enums/private-routes";

export default async function authMiddleware(req: Request, res: Response): Promise<boolean> {
    const privateRoutes = [...Object.values(PrivateRoutes).map(i => String(i))];
    const publicOnlyRoutes = [...Object.values(PublicOnlyRoutes)].map(i => String(i));
    if (!privateRoutes.includes(req.url) && !publicOnlyRoutes.includes(req.url)) {
        return true;
    }

    // @ts-ignore
    res.cookie("XSRF-Token", req.csrfToken());
    const [, error] = await asyncF(authVerify({ sessionCookie: req.cookies.session }));
    if (error) {
        res.redirect(PublicOnlyRoutes.LOGIN);
    } else if (publicOnlyRoutes.includes(req.url)) {
        res.redirect(PrivateRoutes.HOME);
    }
}