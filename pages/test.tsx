import Auth from "../components/Auth";
import { FormEvent, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { CreatedOffer } from "../interfaces/offer";
import { addDays } from "date-fns";
import { Currency } from "../enums/currency";

const Test = () => {
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
        currency: Currency.EUR,
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
      features: {
        kitchen: false,
        wifi: false,
        heating: true,
        smoking: true,
        furnished: true,
        elevator: false,
        fridge: false,
        microwave: false,
      },
      environment: {
        transport: new Set([
          {
            name: "M2",
            distanceTo: 23,
          },
        ]),
      },
      sections: {
        shortDescription: {
          title: "Description",
          content: "Some description",
        },
        more: {
          title: "More",
          content: [],
        },
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
          ownerId: "nWgZw679sTat3TELhNlT5jjf4Ni1",
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

  const updateOffer = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("update offers");
      const res = await fetch(`api/offers/ckwuot8an0001249k2tt7aqci`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
        body: JSON.stringify({
          offer: {
            validUntil: addDays(new Date(), 20),
          },
        }),
      });

      const resJson = await res.json();

      console.log(resJson);
    },
    [xsrfToken]
  );

  const getOffer = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("get offer by id");
      const res = await fetch(`api/offers/ckwuot8an0001249k2tt7aqci`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
      });

      const resJson = await res.json();

      console.log(resJson);
    },
    [xsrfToken]
  );

  const deleteOffer = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("delete offer");
      const res = await fetch(`api/offers/ckwuot8an0001249k2tt7aqci`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": xsrfToken["XSRF-Token"],
        },
      });

      const resJson = await res.json();

      console.log(resJson);
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
        <form onSubmit={getOffers}>
          <button>Get Offers</button>
        </form>
        <form onSubmit={createOffer}>
          <button>Create Offer</button>
        </form>
        <form onSubmit={getOffer}>
          <button>Get Offer</button>
        </form>
        <form onSubmit={updateOffer}>
          <button>Update Offer</button>
        </form>
        <form onSubmit={deleteOffer}>
          <button>Delete Offer</button>
        </form>
      </div>
    </Auth>
  );
};

export default Test;
