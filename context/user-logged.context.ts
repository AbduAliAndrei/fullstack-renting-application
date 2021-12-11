import { SecuredUser } from "../interfaces/user";
import { createContext } from "react";

export interface IUserLogged {
  user: SecuredUser;
  setUserLogged: (user: SecuredUser) => void;
  setUserLoggedOut: () => void;
}

const sampleUserLogged: IUserLogged = {
  user: null,
  setUserLoggedOut: () => null,
  setUserLogged: () => null,
};

const UserContext = createContext<IUserLogged>(sampleUserLogged);

export default UserContext;
