import { LandlordDatabase } from "../../../interfaces/DatabaseLandlords";
import Landlord from "../../../../interfaces/Landlord";
import makeLandlord from "../../entities/landlord";

export default function createAddLandlord({ landlordsDb }: { landlordsDb: LandlordDatabase }) {
    return async function addLandlord(landlordInfo: Landlord) {
        const landlord = makeLandlord(landlordInfo);
        try {
            const exists = await landlordsDb.findById({ id: landlord.getId() });

            if (exists.data) {
                return { data: { writeTime: exists.data.createdAt, data: exists.data } };
            }

            return landlordsDb.add({
                id: landlord.getId(),
                idType: landlord.getIdType(),
                firstName: landlord.getFirstName(),
                lastName: landlord.getLastName(),
                userName: landlord.getUsername(),
                email: landlord.getEmail(),
                password: landlord.getPassword(),
                createdAt: landlord.getCreatedAt(),
                updatedAt: landlord.getUpdatedAt(),
                verified: landlord.getVerified(),
                bio: landlord.getBio(),
                gender: landlord.getGender(),
                picture: landlord.getPicture(),
                offersList: undefined,
                trusted: undefined
            });
        } catch (e) {
            console.error(e);
        }
    }
}