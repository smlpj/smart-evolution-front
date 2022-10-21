import React from "react";

import Head from "next/head";

import OperationDetail from "./components";

const Detail = () => {
  return (
    <>
      <Head>
        <title>Detalle de operación</title>
        <meta name="description" content="Página de detalle de operación" />
        <link rel="icon" href="/assets/Icono Smart.svg" />
      </Head>
      <OperationDetail />
    </>
  );
};

export default Detail;
