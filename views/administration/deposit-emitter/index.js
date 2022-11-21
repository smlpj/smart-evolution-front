import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Head from "next/head";
import { useRouter } from "next/router";

import { Toast } from "@components/toast";

import { useFetch } from "@hooks/useFetch";

import { Deposit } from "./components";
import {
  GetDepositByID,
  ModifyDepositQuery,
  RegisterDepositQuery,
  GetRiskProfile
} from "./queries";

import { useFormik } from "formik";
import { object, string } from "yup";

export default function RegisterDeposit() {

  const [option, setOption] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      setOption(Object.values(router.query)[0]);
      if (router.query.id) {
        setId(router.query.id);
      }
    }
  }, [router.query]);

  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: RegisterDepositQuery, init: false });

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({ service: GetDepositByID, init: false });

  const {
    fetch: fetch3,
    loading: loading3,
    error: error3,
    data: data3,
  } = useFetch({ service: ModifyDepositQuery, init: false });

  const {
    fetch: fetch4,
    loading: loading4,
    error: error4,
    data: data4,
  } = useFetch({ service: GetRiskProfile, init: false });

  useEffect(() => {
    if (option !== "register" && option !== "" && option !== undefined) {
      fetch2(option).then((data) => {
        formik.setValues({
          id: data?.data?.id,
          date: data?.data?.date,
          amount: data?.data?.amount,
          observations: data?.data?.description,
          client: data?.data?.client.id,
          account: data?.data?.account,
        });
      });
    }
  }, [option]);

  const validationSchema = object({
    client: string("Selecciona el emisor")
      .nullable(true)
      .required("El emisor es requerido"),

    account: string("Selecciona la cuenta")
      .nullable(true)
      .required("La cuenta es requerida"),

    date: string("Ingresa la fecha de giro").required("La fecha es requerida"),

    amount: string("Ingresa el monto de operación").required("El monto es requerido"),

    observations: string("Ingresa una observación").nullable(true),

    beneficiary: string("Ingresa el beneficiario").required(
      "El beneficiario es requerido"
    ),

    bank: string("Ingresa el banco")
      .nullable(true)
      .required("El banco es requerido"),

    accountNumber: string("Ingresa el número de cuenta")
      .nullable(true)
      .required("El número de cuenta es requerido"),

    accountType: string("Selecciona el tipo de cuenta")
      .nullable(true)
      .required("El tipo de cuenta es requerido"),

    egressType: string("Selecciona el tipo de egreso")
      .nullable(true)
      .required("El tipo de egreso es requerido"),
  });

  const initialValues = {
    client: null,
    account: null,
    amount: "",
    date: "",
    observations: "",
    beneficiary: "",
    bank: null,
    accountNumber: null,
    accountType: null,
    egressType: null,
    operation: null
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (option === "register") {
        fetch(values);
      } else {
        fetch3(values);
      }
    },
  });

  useEffect(() => {
    if (loading3) Toast("Cargando...", "loading");

    if (error3) Toast("Error al actualizar el giro", "error");

    if (data3) {
      Toast("Giro actualizado correctamente", "success");
      setTimeout(() => {
        router.push("/administration/deposit-emitter/depositList");
      }, 2000);
    }
  }, [loading3, data3, error3]);

  useEffect(() => {
    if (loading == true) {
      Toast("Cargando..", "loading");
    }

    if (error) {
      Toast(`${Object.values(error.message)}`, "error");
    }

    if (data) {
      Toast("Giro creado correctamente", "success");
      setTimeout(() => {
        router.push("/administration/deposit-emitter/depositList");
      }, 2000);
    }
  }, [loading, data, error]);

  useEffect(() => {
    if ( formik.values.client) {
      fetch4(formik.values.client)
    }
  },[formik.values.client])

  useEffect(() => {
    if (data4) {
      formik.setValues({
        ...formik.values,
        beneficiary: data4?.data?.client,
        accountNumber: data4?.data?.account_number,
        accountType: data4?.data?.account_type,
        bank: data4?.data?.bank,
      })
    }

    if (error4) {
      formik.setValues({
        ...formik.values,
        beneficiary: '',
        accountNumber: '',
        accountType: '',
        bank: '',
      })
      Toast("Cliente sin cuenta en el perfil de riesgo", "error");
    }
  },[data4, loading4, error4])  

  return (
    <>
      <Head>
        <title>
          {option === "register"
            ? "Registrar giro-emisor"
            : "Modificar giro-emisor"}
        </title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Deposit
        formik={formik}
        option={option}
        ToastContainer={ToastContainer}
      />
    </>
  );
}
