import Auth from "../components/Auth";
import { FormEvent, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { UserType } from "../enums/user-type";

const Profile = () => {
  const [xsrfToken] = useCookies(["XSRF-TOKEN"]);
  const router = useRouter();

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

  // const onGetUser = useCallback(
  //   async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const res = await fetch("api/users", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "CSRF-Token": xsrfToken["XSRF-Token"],
  //       },
  //     });
  //
  //     const result = await res.json();
  //     console.log(result);
  //   },
  //   [xsrfToken]
  // );

  const onGetUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await fetch(`api/users/hR2r646LPiabzGW6Y5EyBldBOsy2/role`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
        body: JSON.stringify({
          userId: "hR2r646LPiabzGW6Y5EyBldBOsy2",
          role: UserType.LANDLORD,
        }),
      });

      const result = await res.json();
      console.log(result);
    },
    [xsrfToken]
  );

  return (
    <Auth>
      <div>
        Profile
        <div />
        <form onSubmit={onLogout}>
          <button>Logout</button>
        </form>
        <form onSubmit={onGetUser}>
          <button>Update User</button>
        </form>
      </div>
    </Auth>
  );
};

export default Profile;
