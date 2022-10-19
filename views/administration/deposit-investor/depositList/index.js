import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DepositListComponent } from "./components";
import { useFetch } from "../../../../shared/hooks/useFetch";
import { GetBrokerList } from "./queries";

export default function DepositList() {
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetBrokerList, init: true });

  return (
    <>
      <Head>
        <title>Listado de giro-inversionista</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/Icono Smart.svg" />
      </Head>
      <DepositListComponent />
    </>
  );
}
