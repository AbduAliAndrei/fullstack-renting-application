import createAddTenant from "./createTenant";
import {tenantsDb} from "../../functions/models";

const createTenant = createAddTenant({ tenantsDb });


const commonService = Object.freeze({
    createTenant
});

export default commonService;
export { createTenant };
