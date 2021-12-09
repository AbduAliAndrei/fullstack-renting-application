import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
export enum RequestType {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum ContentType {
  JSON,
  FORM_DATA,
}

export type DataFetched<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  response: Response | null;
};

export default function useFetch<Res>({
  type,
  path,
  params = [],
  contentType = ContentType.JSON,
  body,
  query = [],
  timeout,
}: {
  type: RequestType;
  path: string;
  params?: string[];
  contentType?: ContentType;
  body?: Record<string, any>;
  query?: [string, any][];
  timeout?: number;
}): [Res | null, boolean, string | null, Response | null] {
  const [res, setRes] = useState<
    DataFetched<{
      res: Res;
    }>
  >({
    data: null,
    loading: false,
    error: null,
    response: null,
  });

  const ROOT_PATH =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "https://summer-project-49c32.firebaseapp.com/";
  const [xsrfToken] = useCookies(["XSRF-TOKEN"]);

  const fetchCall = () => {
    const apiPath =
      `${ROOT_PATH}/${path}` +
      params.reduce((prev, param) => prev + `/${param}`, "") +
      (query.length > 0
        ? query.reduce(
            (prev, [key, value], ind) =>
              prev + `${ind > 0 ? "&" : "?"}${key}=${value}`,
            ""
          )
        : "");
    const headers: any = {
      "CSRF-Token": xsrfToken["XSRF-Token"],
    };
    if (contentType === ContentType.JSON) {
      headers["Accept"] = "application/json";
      headers["Content-Type"] = "application/json";
    } else if (contentType === ContentType.FORM_DATA) {
      headers.enctype = "multipart/form-data";
    }
    setRes((prev) => ({ ...prev, loading: true }));
    fetch(apiPath, {
      method: type,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(async (result) => {
        const json = await result.json();
        setRes((prevRes) => ({
          ...prevRes,
          data: json,
          response: result,
        }));
      })
      .catch((e) => {
        setRes((prevRes) => ({ ...prevRes, error: e }));
      })
      .finally(() => {
        setRes((prevRes) => ({ ...prevRes, loading: false }));
      });
  };

  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        fetchCall();
      }, timeout);
    } else {
      fetchCall();
    }
  }, [body, contentType, type, xsrfToken]);

  return [res.data?.res, res.loading, res.error, res.response];
}

export const fetchCall = async ({
  type,
  path,
  params = [],
  contentType = ContentType.JSON,
  body,
  query = [],
}: {
  type: RequestType;
  path: string;
  params?: string[];
  contentType?: ContentType;
  body?: Record<string, any>;
  query?: [string, any][];
}) => {
  const ROOT_PATH =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "https://summer-project-49c32.firebaseapp.com/";
  const apiPath =
    `${ROOT_PATH}/${path}` +
    params.reduce((prev, param) => prev + `/${param}`, "") +
    (query.length > 0
      ? query.reduce(
          (prev, [key, value], ind) =>
            prev + `${ind > 0 ? "&" : "?"}${key}=${value}`,
          ""
        )
      : "");
  const headers: any = {};
  if (contentType === ContentType.JSON) {
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
  } else if (contentType === ContentType.FORM_DATA) {
    headers.enctype = "multipart/form-data";
  }
  return await fetch(apiPath, {
    method: type,
    headers: headers,
    body: JSON.stringify(body),
  });
};
