import '../styles/App.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {CookiesProvider} from "react-cookie";
import { Provider } from 'next-auth/client'
import Auth from "../components/Auth";
import {NextComponentType} from "next";

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error } = useSWR('api/');
  console.log(pageProps);

  return (
      <CookiesProvider>
          <Provider session={pageProps.session}>
              {
                  (Component as NextComponentType & { isAuth: boolean }).isAuth ? (
                      <Auth>
                          <Layout>
                              <Component {...pageProps} />
                          </Layout>
                      </Auth>
                  ) : (
                      <Layout>
                          <Component {...pageProps} />
                      </Layout>
                  )
              }

          </Provider>
      </CookiesProvider>
  )
}
export default MyApp
