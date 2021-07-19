import {firestore} from "firebase-admin/lib/firestore";
import Firestore = firestore.Firestore;
import Landlord from "../interfaces/Landlord";
import {LandlordFunction} from "../interfaces/DatabaseLandlords";
import {CollectionPaths} from "../enums/CollectionPaths";
import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export default function makeLandlordsDb ( { db } : { db: Firestore }) {
    return Object.freeze({
        add,
        findAll,
        findById,
        update,
        remove
    });

    async function add(landlordInfo: Landlord): Promise<LandlordFunction<Date>>  {
        const result = await db.collection(CollectionPaths.LANDLORD).doc().set(landlordInfo);
        return { data: result.writeTime.toDate() };
    }

    async function findAll({ name }: { name?: string } ): Promise<LandlordFunction<Landlord[]> & {_name: string}> {
        const opts : [string, WhereFilterOp, string] = ['name', '==', name]
        const result = name ? await db.collection(CollectionPaths.LANDLORD)
            .where(...opts)
            .get() : await db.collection(CollectionPaths.LANDLORD).get();

        let landlords: Landlord[] = [];

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
                picture: doc.data().picture
            })];
        })

        return ({data: landlords, _name: name });
    }

    async function findById({id}: {id: string}): Promise<LandlordFunction<null | Landlord> & {id?: string} >  {
        const landlord = await db.collection(CollectionPaths.LANDLORD).doc(id);
        const data = await landlord.get();
        if (!data.exists) {
            return ({data: null});
        }

        return ({data: data.data() as Landlord, id});
    }

    async function update({id, data}: {id: string, data: Landlord}): Promise<LandlordFunction<Date>> {
        const landlord = await db.collection(CollectionPaths.LANDLORD).doc(id);
        const result = await landlord.update(data);

        return { data: result.writeTime.toDate() };
    }

    async function remove({id}: {id: string}): Promise<LandlordFunction<Date>> {
        const result = await db.collection(CollectionPaths.LANDLORD).doc(id).delete();

        return { data: result.writeTime.toDate() };
    }
}
