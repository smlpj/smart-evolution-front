import Head from "next/head";

import { AdministrationComponents } from "./components";

export default function Bills() {
  return (
    <>
      <Head>
        <title>Administración</title>
        <meta name="description" content="Control de Factura Electrónica" />
        <link rel="icon" href="/assets/Icono Smart.svg" />
      </Head>
      <AdministrationComponents />
    </>
  );
}
