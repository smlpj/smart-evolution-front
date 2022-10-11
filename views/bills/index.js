import { BillsComponents } from "./components";
import Head from "next/head";

export default function Bills() {
  return (
    <>
      <Head>
        <title>Control de Factura Electrónica</title>
        <meta name="description" content="Control de Factura Electrónica" />
        <link rel="icon" href="/assets/Icono Smart.svg" />
      </Head>
      <BillsComponents />
    </>
  );
}
