import { createLandlord } from "../../models/use-cases/user";
import createPostLandlord from "./post-landlord.controller";

const postLandlord = createPostLandlord({ createLandlord });

const landlordController = Object.freeze({
    postLandlord
});


export default landlordController;
export { postLandlord };