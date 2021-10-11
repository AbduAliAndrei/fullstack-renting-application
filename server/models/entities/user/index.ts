import Id from "../../../../utils/id";
import buildMakeTenant from "../user/tenant.entity";
import buildMakeLandlord from "../user/landlord.entity";
import buildMakeAdmin from "../user/admin.entity";

const makeLandlord = buildMakeLandlord({ Id });
const makeTenant = buildMakeTenant({ Id });
const makeAdmin = buildMakeAdmin({ Id });
export { makeTenant, makeLandlord, makeAdmin };
