import "../styles/App.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";
import appTheme from "../theme/appTheme";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CookiesProvider>
      {/* </SWRConfig> */}
    </>
  );
}
export default MyApp;
