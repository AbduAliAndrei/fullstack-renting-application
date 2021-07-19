import createAddTenant from "./createTenant";
import {tenantsDb} from "../../../database";

const createTenant = createAddTenant({ tenantsDb });


const commonService = Object.freeze({
    createTenant
});

export default commonService;
export { createTenant };
