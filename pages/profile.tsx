import Auth from "../components/Auth";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { UserExtended } from "../interfaces/user-extended";
import { UserType } from "../enums/user-type";

const Profile = () => {
  const [xsrfToken] = useCookies(["XSRF-TOKEN"]);
  const router = useRouter();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const parsedUser: UserExtended = JSON.parse(
      window.localStorage.getItem("user")
    ).res;
    setId(() => parsedUser.id);
  }, [id, setId]);

  const onLogout = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("logout");
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
      });
      if (res.status === 301) {
        await router.push("/login");
      }
      console.log(res.status);
    },
    [router, xsrfToken]
  );

  const onDeleteAccount = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("delete");
      const res = await fetch("api/auth", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
        body: JSON.stringify({ id, type: UserType.ADMIN }),
      });
      if (res.status === 204) {
        await router.push("/login");
      }
      console.log(res.status);
    },
    [router, xsrfToken, id]
  );

  return (
    <Auth>
      <div>
        Profile
        <form onSubmit={onLogout}>
          <button id={"logout-btn"}>Logout</button>
        </form>
        <form onSubmit={onDeleteAccount}>
          <button id={"delete-account-btn"}>Delete Account</button>
        </form>
      </div>
    </Auth>
  );
};

export default Profile;
