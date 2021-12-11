import "../styles/App.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";
import appTheme from "../theme/appTheme";
import { createTheme, ThemeProvider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import UserLogged from "../context/user-logged.context";
import { SecuredUser } from "../interfaces/user";
import useFetch, { RequestType } from "../api/data-fetcher";

// const fetcher = async (url) => {
//   try {
//     const res = await axios.get(url);
//     return res.data;
//   } catch (err) {
//     throw err.response.data;
//   }
// };

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error } = useSWR('api/');
  const theme = createTheme(appTheme);
  const [currentUser, setCurrentUser] = useState(null);

  const setUserLogged = useCallback((user: SecuredUser) => {
    setCurrentUser(user);
  }, []);

  const setUserLoggedOut = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const [data, loading] = useFetch<SecuredUser>({
    type: RequestType.GET,
    path: "auth/check",
  });

  useEffect(() => {
    if (data) {
      setCurrentUser(data);
    }
  }, [data, loading]);

  const getContextUser = useCallback(() => {
    return { user: { ...currentUser }, setUserLogged, setUserLoggedOut };
  }, [currentUser, setUserLogged, setUserLoggedOut]);

  return (
    <>
      {/* <Head>
        <title>Renting App</title>
      </Head>
      <SWRConfig
        value={{
          fetcher,
          dedupingInterval: 10000,
        }}
      > */}

      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <UserLogged.Provider value={getContextUser()}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserLogged.Provider>
        </ThemeProvider>
      </CookiesProvider>
      {/* </SWRConfig> */}
    </>
  );
}
export default MyApp;
