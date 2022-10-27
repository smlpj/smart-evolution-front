import Head from "next/head";

import { FormProvider } from "./Context";
import { SelfManagement as SelfManagementComponents } from "./components";

const SelfManagement = () => {
  return (
    <>
      <Head>
        <title>Autogestión</title>
        <meta
          name="description"
          content="Formulario de autogestión del cliente"
        />
      </Head>
      <FormProvider>
        <SelfManagementComponents />
      </FormProvider>
    </>
  );
};

export default SelfManagement;
