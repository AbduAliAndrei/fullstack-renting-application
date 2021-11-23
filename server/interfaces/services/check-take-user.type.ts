import { UserType } from "../../../enums/user-type";
import { UserExtended } from "../../../interfaces/user-extended";

export type CheckTakeUserCreatorParams = {
  takeUser: ({
    id,
    type,
  }: {
    id: string;
    type: UserType;
  }) => Promise<Required<UserExtended>>;
  checkAuth: ({ sessionCookie }: { sessionCookie: string }) => Promise<string>;
};
