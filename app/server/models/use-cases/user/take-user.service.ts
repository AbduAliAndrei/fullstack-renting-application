import {DatabaseEntity} from "../../../interfaces/database-entity";
import {Tenant} from "../../../../interfaces/tenant";
import {Landlord }from "../../../../interfaces/landlord";

export default function takeUserCreator({ tenantsDb }: {tenantsDb :DatabaseEntity<Tenant | Landlord> }) {
    return async function takeUser({ id }: { id: string }): Promise<Required<Tenant | Landlord>> {
        const tenant = await tenantsDb.findById({id});

        if (!tenant.data) {
            throw new Error(`Such tenant user is not yet created on the database. Id: ${id}`);
        }

        return tenant.data;
    }
}