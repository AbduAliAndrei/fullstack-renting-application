import { UserType } from "../../../enums/use-type";
import { UserExtended } from "../../../interfaces/user-extended";

export type LoginUserCreatorParams = {
  takeUser: ({
    id,
  }: {
    id: string;
    type: UserType;
  }) => Promise<Required<UserExtended>>;
  loginCheck: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ idToken: string; uid: string }>;
};
