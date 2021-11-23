import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../../interfaces/database-entity";
import { Landlord } from "../../../../../interfaces/landlord";
import { makeLandlord } from "../../../entities/user";

export default function createAddLandlord({
  landlordsDb,
}: {
  landlordsDb: DatabaseEntity<Landlord>;
}) {
  return async function addLandlord(
    landlordInfo: Landlord
  ): Promise<DatabaseFunction<DatabaseObject<Required<Landlord>>>> {
    const landlord = makeLandlord(landlordInfo);
    try {
      const exists = await landlordsDb.findById({ id: landlord.getId() });

      if (exists.data) {
        return {
          data: { writeTime: exists.data.createdAt, data: exists.data },
        };
      }
      return landlordsDb.add({
        id: landlord.getId(),
        email: landlord.getEmail(),
        firstName: landlord.getFirstName(),
        lastName: landlord.getLastName(),
        userName: landlord.getUsername(),
        password: landlord.getPassword(),
        createdAt: landlord.getCreatedAt(),
        updatedAt: landlord.getUpdatedAt(),
        verified: landlord.isVerified(),
        bio: landlord.getBio(),
        trusted: landlord.isTrusted(),
        gender: landlord.getGender(),
        picture: landlord.getPicture(),
        offersList: landlord.getOffersList(),
      });
    } catch (e) {
      console.log(e);
    }
  };
}
