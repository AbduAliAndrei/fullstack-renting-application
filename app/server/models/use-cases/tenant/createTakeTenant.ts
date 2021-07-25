import {TenantDatabase} from "../../../interfaces/DatabaseTenants";
import {Tenant} from "../../../../interfaces/Tenant";

export default function createTakeTenant({ tenantsDb }: {tenantsDb : TenantDatabase }) {
    return async function takeTenant({ id }: { id: string }): Promise<Required<Tenant>> {
        const tenant = await tenantsDb.findById({id});

        if (!tenant.data) {
            throw new Error('Such tenant user is not yet created on the database');
        }

        return tenant.data;
    }
}