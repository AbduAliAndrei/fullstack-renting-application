import {firestore} from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import { TenantDatabase } from "../interfaces/DatabaseTenants";
import {CollectionPaths} from "../enums/CollectionPaths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Tenant} from "../../interfaces/Tenant";

export default function makeTenantsDb ( { db } : { db: Firestore }): TenantDatabase {
    return Object.freeze({
        add,
        findAll,
        findById,
        update,
        remove
    });

    async function add(tenantInfo: Required<Tenant>) {
        const result = await db.collection(CollectionPaths.TENANT).doc().set(tenantInfo);
        return ({data: {writeTime: result.writeTime.toDate(), data: tenantInfo}});
    }

    async function findAll({ name }: { name?: string } ){
        const opts : [string, WhereFilterOp, string] = ['name', '==', name]
        const result = name ? await db.collection(CollectionPaths.TENANT)
            .where(...opts)
            .get() : await db.collection(CollectionPaths.TENANT).get();

        let tenants: Required<Tenant>[] = [];

        result.forEach(doc => {
            tenants = [ ...tenants,  ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                userName: doc.data().userName,
                email: doc.data().email,
                password: doc.data().password,
                createdAt: doc.data().createdDate,
                updatedAt: doc.data().updatedDate,
                verified: doc.data().verified,
                idType: doc.data().idType,
                gender: doc.data().gender,
                bio: doc.data().bio,
                picture: doc.data().picture
            })];
        })

        return ({data: tenants, _name: name });
    }

    async function findById({id}: {id: string}) {
        const tenant = await db.collection(CollectionPaths.TENANT).doc(id);
        const data = await tenant.get();
        if (!data.exists) {
            return ({data: null});
        }

        return ({data: data.data() as Required<Tenant>, id});
    }

    async function update({id, data}: {id: string, data: Required<Tenant>}) {
        const tenant = await db.collection(CollectionPaths.TENANT).doc(id);
        const result = await tenant.update(data);

        return { data: { writeTime: result.writeTime.toDate(), data } };
    }

    async function remove({id}: {id: string}) {
        const result = await db.collection(CollectionPaths.TENANT).doc(id).delete();

        return { data: { writeTime: result.writeTime.toDate(), data: id } };
    }
}
