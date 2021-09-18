import { createTenant } from "../../models/use-cases/user";
import createPostTenant from "./post-tenant.controller";

const postTenant = createPostTenant({ createTenant });

const tenantController = Object.freeze({
    postTenant
});


export default tenantController;
export { postTenant };