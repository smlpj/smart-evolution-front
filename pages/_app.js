import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
import { useRouter } from "next/router";

import { ThemeProvider } from "@mui/material/styles";

import Layout from "@components/layout";

import "../public/fontawesome/css/all.min.css";
import "../public/icomoon/style.css";
import "../styles/globals.css";
import theme from "../styles/themes";

import { AuthProvider } from "@context/authContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <>
            <Head>
              <title>Smart Evolution</title>
            </Head>

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
          </>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
