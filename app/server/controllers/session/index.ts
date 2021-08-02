import createGetSession from "./getSession";
import {takeCheckTenant} from "../../models/use-cases/tenant";


const getSession = createGetSession({ takeCheckedTenant: takeCheckTenant });

const sessionController = Object.freeze({
    getSession
});

export default sessionController;

export { getSession };