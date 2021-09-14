import makeTenant from "../../../entities/tenant";
import {DatabaseEntity, DatabaseFunction, DatabaseObject} from "../../../../interfaces/database-entity";
import {Tenant} from '../../../../../interfaces/tenant';

export default function createAddTenant({ tenantsDb }: {tenantsDb : DatabaseEntity<Tenant> })
{
    return async function addTenant(tenantInfo: Tenant): Promise<DatabaseFunction<DatabaseObject<Required<Tenant>>>> {
        const tenant = makeTenant(tenantInfo);
        try {
            const exists = await tenantsDb.findById({id: tenant.getId()});

            if (exists.data) {
                return {data: {writeTime: exists.data.createdAt, data: exists.data}};
            }

            return tenantsDb.add({
                id: tenant.getId(),
                idType: tenant.getIdType(),
                firstName: tenant.getFirstName(),
                lastName: tenant.getLastName(),
                userName: tenant.getUsername(),
                email: tenant.getEmail(),
                password: tenant.getPassword(),
                createdAt: tenant.getCreatedAt(),
                updatedAt: tenant.getUpdatedAt(),
                verified: tenant.getVerified(),
                bio: tenant.getBio(),
                gender: tenant.getGender(),
                picture: tenant.getPicture()
            });
        } catch (e) {
            console.error(e);
        }
    }
}