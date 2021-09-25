import "../styles/App.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CookiesProvider } from "react-cookie";
import { Provider } from "next-auth/client";
import Auth from "../components/Auth";
import { NextComponentType } from "next";

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error } = useSWR('api/');

  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}
export default MyApp;
