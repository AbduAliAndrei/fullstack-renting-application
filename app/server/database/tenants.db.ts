import {firestore} from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import {CollectionPaths} from "../enums/collection-paths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {Tenant} from "../../interfaces/tenant";
import {DatabaseEntity} from "../interfaces/database-entity";

export default function makeTenantsDb ( { db } : { db: Firestore }): DatabaseEntity<Tenant> {
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
        const tenantsRef = await db.collection(CollectionPaths.TENANT);
        const data = await tenantsRef.where('id', '==', id).get();
        if (data.empty) {
            return ({data: null});
        }
        let tenant!: Required<Tenant>;
        let index = 0;
        data.forEach((data) => {
            if (index > 0) {
                return;
            }

            tenant = ({
                id: data.id,
                firstName: data.data().firstName,
                lastName: data.data().lastName,
                userName: data.data().userName,
                email: data.data().email,
                password: data.data().password,
                createdAt: data.data().createdDate,
                updatedAt: data.data().updatedDate,
                verified: data.data().verified,
                idType: data.data().idType,
                gender: data.data().gender,
                bio: data.data().bio,
                picture: data.data().picture
            })
        })

        return ({data: tenant, id});
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
