import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

import Layout from "@components/layout";

import "../public/fontawesome/css/all.min.css";
import "../public/icomoon/style.css";
import "../styles/globals.css";

import { AuthProvider } from "@context/authContext";

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
