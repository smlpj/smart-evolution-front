import Head from "next/head";

import { useFetch } from "@hooks/useFetch";

import { ClientListComponent } from "./components";
import { GetClientList } from "./queries";

export default function ClientList() {
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetClientList, init: true });

  return (
    <>
      <Head>
        <title>Consulta de clientes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/Icono Smart.svg" />
      </Head>
      <ClientListComponent />
    </>
  );
}
