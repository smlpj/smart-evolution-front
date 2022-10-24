import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Head from "next/head";
import { useRouter } from "next/router";

import { Toast } from "@components/toast";

import { useFetch } from "@hooks/useFetch";

import { SignUpBroker } from "./components";
import {
  GetBrokerByID,
  ModifyBrokerQuery,
  RegisterBrokerQuery,
} from "./queries";

import { useFormik } from "formik";
import { object, string } from "yup";

export default function RegisterBroker() {
  const [option, setOption] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      setOption(Object.values(router.query)[0]);
      console.log(option);
    }
  }, [router.query]);

  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: RegisterBrokerQuery, init: false });

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({ service: GetBrokerByID, init: false });

  const {
    fetch: fetch3,
    loading: loading3,
    error: error3,
    data: data3,
  } = useFetch({ service: ModifyBrokerQuery, init: false });

  useEffect(() => {
    if (option !== "register" && option !== "" && option !== undefined) {
      fetch2(option).then((data) => {
        formik.setValues({
          id: data?.data?.id,
          type_identity: data?.data?.type_identity,
          document_number: data?.data?.document_number,
          department: data?.data?.department,
          first_name: data?.data?.first_name,
          last_name: data?.data?.last_name,
          email: data?.data?.email,
          address: data?.data?.address,
          phone_number: data?.data?.phone_number,
          city: data?.data?.city,
        });
      });
    }
  }, [option]);

  const validationSchema = object({
    type_identity: string("Ingresa el tipo de identificación del corredor")
      .nullable(true)
      .required("El tipo de identificación es requerido"),

    document_number: string("Ingresa un número de documento")
      .matches(/^[0-9]+$/, "Ingresa un número de documento válido")
      .required("El número de documento es requerido"),

    first_name: string("Ingresa un nombre")
      .matches(/[a-zA-Z]+/, "Ingresa un nombre válido")
      .required("El nombre es requerido"),

    last_name: string("Ingresa un apellido")
      .matches(/^[a-zA-Z]+$/, "Ingresa un apellido válido")
      .required("El apellido es requerido"),

    email: string("Ingresa un email")
      .matches(
        /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/,
        "Ingresa un email válido"
      )
      .required("El email es requerido"),

    address: string("Ingresa una dirección").required(
      "La dirección es requerida"
    ),

    phone_number: string("Ingresa un número de teléfono")
      .matches(/^[0-9]+$/, "Ingresa un número de teléfono válido")
      .required("El número de teléfono es requerido"),

    city: string("Ingresa una ciudad")
      .nullable(true)
      .required("La ciudad es requerida"),
  });

  const initialValues = {
    type_identity: null,
    document_number: "",
    first_name: null,
    last_name: null,
    email: "",
    address: "",
    phone_number: "",
    city: null,
    department: null,
    social_reason: null,
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

    if (error3) Toast("Error al actualizar el corredor", "error");

    if (data3) {
      Toast("Corredor actualizado correctamente", "success");
      setTimeout(() => {
        router.push("brokers/brokerList");
      }, 2000);
    }
  }, [loading3, data3, error3]);

  useEffect(() => {
    if (loading == true) {
      Toast("Cargando..", "loading");
    }

    if (error) {
      Toast(`${Object.values(error.message)[0]}`, "error");
    }

    if (data) {
      Toast("Corredor creado correctamente", "success");
      setTimeout(() => {
        router.push("brokers/brokerList");
      }, 2000);
    }
  }, [loading, data, error]);

  return (
    <>
      <Head>
        <title>Registro de corredores</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <SignUpBroker
        formik={formik}
        option={option}
        ToastContainer={ToastContainer}
      />
    </>
  );
}
