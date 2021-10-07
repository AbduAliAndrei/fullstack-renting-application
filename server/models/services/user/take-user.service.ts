import {DatabaseEntity} from "../../../interfaces/database-entity";
import {Tenant} from "../../../../interfaces/tenant";
import {Landlord} from "../../../../interfaces/landlord";
import {UserType} from "../../../../enums/use-type";
import {UserExtended} from "../../../../interfaces/user-extended";

interface TakeUserInterface {
    tenantsDb :DatabaseEntity<Tenant>,
    landlordsDb: DatabaseEntity<Landlord>,
}

export default function takeUserCreator({ tenantsDb, landlordsDb }: TakeUserInterface ) {
    return async function takeUser(obj: { id: string, type: UserType }): Promise<Required<UserExtended>> {
        const strategies = {
            [UserType.LANDLORD]: async (id: string) => landlordsDb.findById({id}),
            [UserType.TENANT]: async (id: string) => tenantsDb.findById({id})
        }
        console.log(strategies[UserType.TENANT].name);
        const user = await strategies[obj.type](obj.id);

        if (!user.data) {
            throw new Error(`Such user is not yet created on the database. Id: ${obj.id}`);
        }

        return user.data;
    }
}