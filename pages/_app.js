import "../styles/globals.css";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Layout from "../shared/components/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/icomoon/style.css" />
      </Head>
      {router.pathname !== "/auth/login" &&
      router.pathname !== "/brokers" &&
      router.pathname !== "/customers" &&
      router.pathname !== "/" &&
      router.pathname !== "/administration/deposit" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
