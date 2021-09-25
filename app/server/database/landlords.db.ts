import {firestore} from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import Landlord from "../../interfaces/landlord";
import {CollectionPaths} from "../enums/collection-paths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {DatabaseEntity} from "../interfaces/database-entity";

export default function makeLandlordsDb ( { db } : { db: Firestore }): DatabaseEntity<Landlord> {
    return Object.freeze({
        add,
        findAll,
        findById,
        update,
        remove
    });

    async function add(landlordInfo: Required<Landlord>)  {
        const result = await db.collection(CollectionPaths.LANDLORD).doc().set(landlordInfo);
        return { data: { writeTime: result.writeTime.toDate(), data: landlordInfo } };
    }

    async function findAll({ name }: { name?: string } ) {
        const opts : [string, WhereFilterOp, string] = ['name', '==', name]
        const result = name ? await db.collection(CollectionPaths.LANDLORD)
            .where(...opts)
            .get() : await db.collection(CollectionPaths.LANDLORD).get();

        let landlords: Required<Landlord>[] = [];

        result.forEach(doc => {
            landlords = [ ...landlords,  ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                userName: doc.data().userName,
                email: doc.data().email,
                password: doc.data().password,
                createdAt: doc.data().createdDate,
                updatedAt: doc.data().updatedDate,
                verified: doc.data().verified,
                offersList: doc.data().offersList,
                trusted: doc.data().trusted,
                bio: doc.data().bio,
                picture: doc.data().picture,
                gender: doc.data().gender
            })];
        })

        return ({data: landlords, _name: name });
    }

    async function findById({id}: {id: string}) {
        const landlord = await db.collection(CollectionPaths.LANDLORD).doc(id);
        const data = await landlord.get();
        if (!data.exists) {
            return ({data: null});
        }

        return ({data: data as unknown as Required<Landlord>, id});
    }

    async function update({id, data}: {id: string, data: Required<Landlord>}) {
        const landlord = await db.collection(CollectionPaths.LANDLORD).doc(id);
        const result = await landlord.update(data);

        return { data: { writeTime: result.writeTime.toDate(), data } };
    }

    async function remove({id}: {id: string}) {
        const result = await db.collection(CollectionPaths.LANDLORD).doc(id).delete();

        return { data: { writeTime: result.writeTime.toDate(), data: id } };
    }
}
