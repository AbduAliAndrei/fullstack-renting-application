import createAddTenant from "./createTenant";
import {tenantsDb, authVerify} from "../../../database";
import createTakeTenant from "./createTakeTenant";
import createCheckTakeTenant from "./createTakeCheckTenant";

const createTenant = createAddTenant({ tenantsDb });
const takeTenant = createTakeTenant({ tenantsDb });
const takeCheckTenant = createCheckTakeTenant({ takeTenant, checkAuth: authVerify });


const commonService = Object.freeze({
    createTenant,
    takeTenant,
    takeCheckTenant
});

export default commonService;
export { createTenant, takeCheckTenant, takeTenant };
