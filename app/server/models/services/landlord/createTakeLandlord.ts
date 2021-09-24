import {LandlordDatabase} from "../../../interfaces/DatabaseLandlords";
import Landlord from "../../../../interfaces/Landlord";

export default function createTakeTenant({ landlordsDb }: {landlordsDb : LandlordDatabase }) {
    return async function takeTenant({ id }: { id: string }): Promise<Required<Landlord>> {
        const landlord = await landlordsDb.findById({id});

        if (!landlord.data) {
            throw new Error(`Such tenant user is not yet created on the database. Id: ${id}`);
        }

        return landlord.data;
    }
}