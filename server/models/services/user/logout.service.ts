type LogoutServiceParams = {
  authLogout: () => Promise<boolean>;
};

export default function logoutService({ authLogout }: LogoutServiceParams) {
  return async function logout(): Promise<boolean> {
    return await authLogout();
  };
}
