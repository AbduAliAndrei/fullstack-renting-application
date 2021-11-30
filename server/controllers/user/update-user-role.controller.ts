import { UserType } from "../../../enums/user-type";
import {
  DatabaseFunction,
  DatabaseObject,
} from "../../interfaces/database-entity";
import { HttpRequest } from "../../interfaces/http-request";
import Controller from "../../interfaces/controller";
import asyncF from "../../../utils/async-f";
import { HttpStatus } from "../../enums/http-status";
import { Role } from "../../../interfaces/role";

export default function createUpdateUserRole({
  updateRole,
}: {
  updateRole: ({
    id,
    role,
  }: {
    id: string;
    role: UserType;
  }) => Promise<DatabaseFunction<DatabaseObject<Required<Role>>>>;
}) {
  return async function updateUserRole(
    httpRequest: HttpRequest
  ): Promise<Controller<DatabaseFunction<DatabaseObject<Required<Role>>>>> {
    const process = async (): Promise<
      DatabaseFunction<DatabaseObject<Required<Role>>>
    > => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { source = {}, role } = httpRequest.body;
      const userId = httpRequest.params["id"];
      return await updateRole({ id: userId, role: role });
    };

    const [data, error] = await asyncF(process());
    let result!: Controller<DatabaseFunction<DatabaseObject<Required<Role>>>>;
    if (error) {
      result = {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: HttpStatus.BAD_REQUEST,
        body: {
          error: (error as { message: string }).message,
        },
      };
    } else {
      result = {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(data.fetchedData.writeTime).toUTCString(),
        },
        statusCode: HttpStatus.OK,
        body: { res: data },
      };
    }

    return result;
  };
}
