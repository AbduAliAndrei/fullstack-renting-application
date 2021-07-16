import { createTenant } from "../../use-cases/tenant";
import createPostTenant from "./post-tenant";

const postTenant = createPostTenant({ createTenant });

const tenantController = Object.freeze({
    postTenant
});


export default tenantController;
export { postTenant };