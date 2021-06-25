import {firestore} from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import Tenant from "../../interfaces/Tenant";
import {TenantFunction} from "../../interfaces/DatabaseTenants";
import {CollectionPaths} from "../../enums/CollectionPaths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export default function makeTenantsDb ( { db } : { db: Firestore }) {
    return Object.freeze({
        add,
        findAll,
        findById,
        update,
        remove
    });

    async function add(tenantInfo: Tenant): Promise<TenantFunction<Date>>  {
        const result = await db.collection(CollectionPaths.TENANT).doc().set(tenantInfo);
        return { data: result.writeTime.toDate() };
    }

    async function findAll({ name }: { name?: string } ): Promise<TenantFunction<Tenant[]> & {_name: string}> {
        const opts : [string, WhereFilterOp, string] = ['name', '==', name]
        const result = name ? await db.collection(CollectionPaths.TENANT)
            .where(...opts)
            .get() : await db.collection(CollectionPaths.TENANT).get();

        let tenants: Tenant[] = [];

        result.forEach(doc => {
            tenants = [ ...tenants,  ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                userName: doc.data().userName
            })];
        })

        return ({data: tenants, _name: name });
    }

    async function findById({id}: {id: string}): Promise<TenantFunction<null | Tenant> & {id?: string} >  {
        const tenant = await db.collection(CollectionPaths.TENANT).doc(id);
        const data = await tenant.get();
        if (!data.exists) {
            return ({data: null});
        }

        return ({data: data.data() as Tenant, id});
    }

    async function update({id, data}: {id: string, data: Tenant}): Promise<TenantFunction<Date>> {
        const tenant = await db.collection(CollectionPaths.TENANT).doc(id);
        const result = await tenant.update(data);

        return { data: result.writeTime.toDate() };
    }

    async function remove({id}: {id: string}): Promise<TenantFunction<Date>> {
        const result = await db.collection(CollectionPaths.TENANT).doc(id).delete();

        return { data: result.writeTime.toDate() };
    }
}
