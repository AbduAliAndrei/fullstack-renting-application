import Auth from "../components/Auth";
import { FormEvent, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { CreatedOffer } from "../interfaces/offer";

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

  const getOffers = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("get offers");
      const res = await fetch("api/offers", {
        method: "GET",
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

      const result = await res.json();
      console.log(result);
    },
    [router, xsrfToken]
  );

  const [offer] = useState<CreatedOffer>({
    generalInfo: {
      title: "Generated title without image",
      cost: {
        totalCost: 50000,
        coldRent: 40000,
        utilities: 10000,
        extras: 0,
      },
      address: {
        streetName: "Kazyncy",
        houseNumber: "69a",
        postalCode: 6969,
        district: "X11",
        city: "Budapest",
        country: "Hungary",
        mapLink: "123.com",
      },
      area: 34,
      numberOfRooms: 2,
    },
    additionalInfo: {
      environment: {
        transport: new Set([
          {
            name: "M2",
            distanceTo: 23,
          },
        ]),
      },
    },
    validUntil: new Date(),
    validFrom: new Date(),
  });

  async function getFileFromUrl(url, name, defaultType = "image/jpeg") {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: response.headers.get("content-type") || defaultType,
    });
  }

  const createOffer = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const image = await getFileFromUrl(
        "https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg",
        "example.jpg"
      );
      const images = Array(10)
        .fill(false)
        .map(() => image);

      const res = await fetch("api/offers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
        body: JSON.stringify({
          offer: offer,
          ownerId: "RjhpI5Ux6cQycC4orKBNiHjAKj02",
        }),
      });
      const result = await res.json();
      console.log(Object.freeze(result));

      const formData = new FormData();

      images.map((i) => {
        formData.append("images", i);
      });

      images.map((i) => {
        formData.append("planLayout", i);
      });

      const res1 = await fetch(`api/offers/images/${result.res.data.id}`, {
        method: "POST",
        headers: {
          "CSRF-Token": xsrfToken["XSRF-Token"],
          enctype: "multipart/form-data",
        },
        body: formData,
      });

      const res2 = await res1.json();
      console.log(res2);
    },
    [offer, xsrfToken]
  );

  return (
    <Auth>
      <div>
        Profile
        <div />
        <form onSubmit={onLogout}>
          <button>Logout</button>
        </form>
        <form onSubmit={getOffers}>
          <button>Get Offers</button>
        </form>
        <form onSubmit={createOffer}>
          <button>Create Offer</button>
        </form>
      </div>
    </Auth>
  );
};

export default Profile;
