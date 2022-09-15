import "../styles/globals.css";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Layout from "../shared/components/layout";
import Header from "../shared/components/header";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/auth/login" &&
      router.pathname !== "/clients" &&
      router.pathname !== "/customers" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : router.pathname !== "/clients" && router.pathname !== "/customers" ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
