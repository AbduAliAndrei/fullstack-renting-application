import "../styles/App.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";
import kaifstoreTheme from "../theme/kaifstoreTheme";
import {createTheme, ThemeProvider} from "@mui/material";
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error } = useSWR('api/');
  const theme = createTheme(kaifstoreTheme);

  return (
      <>
          <Head>
              <title>Renting App</title>
          </Head>
          <CookiesProvider>
              <ThemeProvider theme={theme}>
                  <Layout>
                      <Component {...pageProps} />
                  </Layout>
              </ThemeProvider>
          </CookiesProvider>
      </>
  );
}
export default MyApp;
