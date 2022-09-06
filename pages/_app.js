import "../styles/globals.css";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Layout from "../shared/components/layout";

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
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
