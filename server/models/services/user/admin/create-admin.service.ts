import {
  DatabaseEntity,
  DatabaseFunction,
  DatabaseObject,
} from "../../../../interfaces/database-entity";
import { Admin } from "../../../../../interfaces/admin";
import { makeAdmin } from "../../../entities/user";

export default function createAddAdmin({
  adminsDb,
}: {
  adminsDb: DatabaseEntity<Admin>;
}) {
  return async function addAdmin(
    adminInfo: Admin
  ): Promise<DatabaseFunction<DatabaseObject<Required<Admin>>>> {
    const admin = makeAdmin(adminInfo);
    try {
      const exists = await adminsDb.findById({ id: admin.getId() });
      if (exists.data) {
        return {
          data: { writeTime: exists.data.createdAt, data: exists.data },
        };
      }

      return adminsDb.add({
        id: admin.getId(),
        email: admin.getEmail(),
        password: admin.getPassword(),
        userName: admin.getUsername(),
        firstName: admin.getFirstName(),
        lastName: admin.getLastName(),
        createdAt: admin.getCreatedAt(),
        updatedAt: admin.getUpdatedAt(),
        verified: admin.isVerified(),
        admin: admin.isAdmin(),
        gender: admin.getGender(),
        picture: admin.getPicture(),
        bio: admin.getBio(),
      });
    } catch (e) {
      console.log(e);
    }
  };
}
