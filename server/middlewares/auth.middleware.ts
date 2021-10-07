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
    const [data, error] = await asyncF(authVerify({ sessionCookie: req.cookies.session ?? '' }), true);

    if (publicOnlyRoutes.includes(req.url) && data) {
        res.redirect(PrivateRoutes.HOME);
        return;
    }

    if (error && !publicOnlyRoutes.includes(req.url)) {
        res.redirect(PublicOnlyRoutes.LOGIN);
    }
}