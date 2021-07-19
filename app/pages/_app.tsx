import '../styles/App.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error } = useSWR('api/');

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
