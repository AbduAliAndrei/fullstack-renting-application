import {DatabaseEntity} from "../../../interfaces/database-entity";
import {Tenant} from "../../../../interfaces/tenant";
import {Landlord} from "../../../../interfaces/landlord";
import createAddTenant from "./tenant/create-tenant.service";
import createAddLandlord from "./landlord/create-landlord.service";


// TODO Implement createUser function
export default function createUserCreator({ db }: {db: DatabaseEntity<Tenant | Landlord>  })
{
    return async function createUser(info: Tenant | Landlord, strategy: 'landlord' | 'tenant') {
        const strategies = {
            tenant: createAddTenant({tenantsDb: db as DatabaseEntity<Tenant>}),
            landlord : createAddLandlord ({landlordsDb: db as DatabaseEntity<Landlord>}),
        }
    }
}

