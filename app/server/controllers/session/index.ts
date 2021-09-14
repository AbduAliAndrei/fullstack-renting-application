import createGetSession from "./get-session.controller";
import {checkTakeUser} from "../../models/use-cases/user";


const getSession = createGetSession({ checkTakeUser });

const sessionController = Object.freeze({
    getSession
});

export default sessionController;

export { getSession };