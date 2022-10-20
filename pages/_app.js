import "../styles/globals.css";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Layout from "../shared/components/layout";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../shared/context/authContext";
import "../public/icomoon/style.css";
import "../public/fontawesome/css/all.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <AuthProvider>
        {router.pathname !== "/auth/login" &&
        router.pathname !== "/brokers" &&
        router.pathname !== "/customers" &&
        router.pathname !== "/" &&
        router.pathname !== "/administration/deposit-investor" &&
        router.pathname !== "/administration/deposit-emitter" ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </>
  );
}

export default MyApp;
