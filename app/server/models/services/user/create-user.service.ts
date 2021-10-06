import {DatabaseEntity} from "../../../interfaces/database-entity";
import {Tenant} from "../../../../interfaces/tenant";
import {Landlord} from "../../../../interfaces/landlord";
import createAddTenant from "./tenant/create-tenant.service";
import createAddLandlord from "./landlord/create-landlord.service";
import {UserType} from "../../../../enums/use-type";

export default function createUserCreator({ db }: {db: DatabaseEntity<Tenant | Landlord>  })
{
    return async function createUser(info: Tenant | Landlord, strategy: UserType) {
        const strategies = {
            [UserType.TENANT]: createAddTenant({tenantsDb: db as DatabaseEntity<Tenant>}),
            [UserType.LANDLORD] : createAddLandlord ({landlordsDb: db as DatabaseEntity<Landlord>}),
        }

        return strategies[strategy];
    }
}

