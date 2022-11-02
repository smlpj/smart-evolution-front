import Head from "next/head";

import OperationDetail from "./components";

const Detail = () => {
  return (
    <>
      <Head>
        <title>Detalle de operación</title>
        <meta name="description" content="Página de detalle de operación" />
      </Head>
      <OperationDetail />
    </>
  );
};

export default Detail;
