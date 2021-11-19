import Id from "../../../../utils/id";
import buildMakeTenant from "../user/tenant.entity";
import buildMakeLandlord from "../user/landlord.entity";

const makeLandlord = buildMakeLandlord({ Id });

const makeTenant = buildMakeTenant({ Id });
export { makeTenant, makeLandlord };
